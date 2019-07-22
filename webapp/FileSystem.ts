type StoreKind = 'local_default' | 'local_file' | 'cloud' | 'url'

interface CloudConfig {
  region: string
  accessKeyId: string
  secretAccessKey: string
  s3Bucket: string
}

interface Drive {
  name: string
  config: CloudConfig | null
  kind: StoreKind
  files(): FileEntry[]
  setFiles(index: FileEntry[]): void
  addFile(name: string, source: string): void
  buildStore(name: string): GraphStorage
}

interface FileEntry {
  name: string
  date: string
  backingStore: StoreKind
}

interface GraphStorage {
  read(callback: (_: string) => void): void
  save(src: string): void
  clear(): void
  kind: StoreKind
}

class LocalDrive implements Drive {
  name: 'Local files'
  config: null
  kind: 'local_file'
  files(): FileEntry[] {
    return JSON.parse(localStorage['nomnoml.file_index'] || '[]') as FileEntry[]
  }
  setFiles(index: FileEntry[]): void {
    localStorage['nomnoml.file_index'] = JSON.stringify(index)
  }
  addFile(name: string, source: string): void {
    var entry = {
      name: name,
      date: (new Date()).toISOString(),
      backingStore: this.kind
    }
    var index = this.files()
    index.push(entry)
    index.sort((a,b) => a.name.localeCompare(b.name))
    this.setFiles(index)
    this.buildStore(entry.name).save(source)
  }
  buildStore(name: string): GraphStorage {
    return new LocalFileGraphStore(name)
  }
}

class FileSystem {
  constructor(private aws: any) {}
  signals: Observable = Observable({})
  on = this.signals.on
  off = this.signals.off
  drives: Drive[] = []
  files(): FileEntry[] {
    return JSON.parse(localStorage['nomnoml.file_index'] || '[]') as FileEntry[]
  }
  setFiles(index: FileEntry[]): void {
    localStorage['nomnoml.file_index'] = JSON.stringify(index)
    this.signals.trigger('updated')
  }
  activeFile: FileEntry
  storage: GraphStorage = new DefaultGraphStore()
  moveToFileStorage(name: string, source: string) {
    var entry = {
      name: name,
      date: (new Date()).toISOString(),
      backingStore: 'local_file' as StoreKind
    }
    var index = this.files()
    index.push(entry)
    index.sort((a,b) => a.name.localeCompare(b.name))
    localStorage['nomnoml.file_index'] = JSON.stringify(index)
    var fileStore = new LocalFileGraphStore(entry.name)
    fileStore.save(source)
    this.signals.trigger('updated')
  }
  moveToLocalStorage(source: string){
    this.storage = new DefaultGraphStore()
    this.storage.save(source)
  }
  discard(entry: FileEntry): void {
    var fileStore = new LocalFileGraphStore(entry.name)
    fileStore.clear()
    this.setFiles(this.files().filter(e => e.name != entry.name))
    this.signals.trigger('updated')
  }
  configureByRoute(path: string) {
    var route = Route.from(path)
    this.storage = this.routedStorage(route)
    this.activeFile = nomnoml.skanaar.find(this.files(), e => e.name === route.path) || { name: route.path, date: (new Date()).toISOString(), backingStore: 'local_file' }
    this.signals.trigger('updated')
  }
  routedStorage(route: Route): GraphStorage {
    if (route.context === 'view') {
      return new UrlGraphStore(decodeURIComponent(route.path))
    }
    if (route.context === 'file') {
      return new LocalFileGraphStore(route.path)
    }
    if (route.context === 's3') {

      return new S3GraphStore(this.aws, route.path)
    }
    return new DefaultGraphStore()
  }
}

abstract class LocalGraphStore implements GraphStorage {
  kind: StoreKind
  constructor(private key: string) {}
  read(callback: (_: string) => void): void {
    callback(localStorage[this.key])
  }
  save(source: string): void { localStorage[this.key] = source }
  clear(): void { localStorage.removeItem(this.key) }
}

class LocalFileGraphStore extends LocalGraphStore {
  kind: StoreKind = 'local_file'
  constructor(key: string) { super('nomnoml.files/' + key) }
}

class DefaultGraphStore extends LocalGraphStore {
  kind: StoreKind ='local_default'
  constructor() { super('nomnoml.lastSource') }
}

class UrlGraphStore implements GraphStorage {
  kind: StoreKind = 'url'
  constructor(private source: string) {}
  read(callback: (_: string) => void): void {
    callback(this.source)
  }
  save(source: string): void { }
  clear(): void {}
}

type S3Callback = (err: Error, data?: { Body: any }) => void
type S3Get = { Key: string }
type S3Put = { Key: string, Body: string }

interface S3 {
  getObject: (request: S3Get, callback: S3Callback) => void
  upload: (request: S3Put, callback: S3Callback) => void
}

class S3GraphStore implements GraphStorage {
  kind: StoreKind = 'cloud'
  s3: S3
  constructor(private aws: any, private key: string) {
    this.s3 = this.initS3(aws)
  }
  read(callback: (_: string) => void): void {
    this.s3.getObject({ Key: this.key }, handleError(callback))
  }
  save(source: string): void {
    this.s3.upload({ Key: this.key, Body: source }, handleError((_: string) => {}))
  }
  clear(): void {}
  private initS3(aws: any): S3 {
    var conf: CloudConfig = JSON.parse(window.localStorage['nomnoml.cloudDrive'] || '')
    if (conf && conf.region && conf.accessKeyId && conf.secretAccessKey && conf.s3Bucket) {
      aws.config.update({
        region: conf.region,
        accessKeyId: conf.accessKeyId,
        secretAccessKey: conf.secretAccessKey
      })
      return new aws.S3({ apiVersion: '2006-03-01', params: { Bucket: conf.s3Bucket } })
    }
   throw new Error('no cloud drive configured')
  }
}

function handleError(callback: (_: string) => void): S3Callback {
  return function (err: Error, data: { Body: any }): void {
    if (err)
      alert('Error: ' + err.message);
    else
      callback(data.Body && data.Body.toString());
  }
}

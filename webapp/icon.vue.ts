var icon = (function() {
  var icons: { [key: string]: string } = {
  "link-outline": "<path d=\"M17.5 6c.3 0 .6.1.8.3.4.5.4 1.1 0 1.6l-1.7 1.7.3.3c.5.6.9 1.4.9 2.2s-.4 1.6-1 2.2l-4.1 4.2c-.6.5-1.4.9-2.2.9s-1.6-.4-2.2-1l-.3-.2-1.7 1.7a1 1 0 0 1-1.6 0c-.4-.5-.4-1.1 0-1.6l1.7-1.7-.3-.3c-.5-.6-.9-1.4-.9-2.2s.4-1.6 1-2.2l4.1-4.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.3 1.7-1.7c.2-.2.5-.3.8-.3m0-2a3 3 0 0 0-2.2 1l-.5.4a5.2 5.2 0 0 0-5.9 1l-4.2 4a5 5 0 0 0-1 6l-.4.5a3 3 0 0 0 0 4.4 3 3 0 0 0 4.4 0l.5-.5a5 5 0 0 0 5.9-1l4.2-4a5 5 0 0 0 1-6l.4-.5a3 3 0 0 0 0-4.4 3 3 0 0 0-2.2-.9zm-6.1 7.2a2 2 0 0 0 2 2L11.6 15a2 2 0 0 0-2-2l1.8-1.8M12.5 9c-.2 0-.5.1-.6.3l-4.2 4.2c-.2.1-.3.4-.3.6 0 .2.1.5.3.6l.3.3.7-.7a1 1 0 0 1 1.6 0c.4.5.4 1.1 0 1.6l-.7.7.3.3c.1.2.4.3.6.3l.6-.3 4.2-4.2c.2-.1.3-.4.3-.6 0-.2-.1-.5-.3-.6l-.3-.3-.7.7a1 1 0 0 1-1.6 0c-.4-.5-.4-1.1 0-1.6l.7-.7-.3-.3a.9.9 0 0 0-.6-.3z\"/>",
  "camera-outline": "<path d=\"M19 20h-14c-1.6 0-3-1.3-3-3v-8c0-1.6 1.3-3 3-3h1.5l1-1c.5-.5 1.5-1 2.4-1h4c.8 0 1.8.4 2.4 1l1 1h1.5c1.6 0 3 1.3 3 3v8c0 1.6-1.3 3-3 3zm-14-12c-.5 0-1 .4-1 1v8c0 .5.4 1 1 1h14c.5 0 1-.4 1-1v-8c0-.5-.4-1-1-1h-2c-.2 0-.52-.1-.7-.2l-1.2-1.2c-.2-.2-.7-.4-1-.4h-4c-.2 0-.7.2-1 .4l-1.2 1.2c-.1.1-.4.2-.7.2h-2zM12 10c1.3 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5m0-1c-1.9 0-3.5 1.5-3.5 3.5 0 1.9 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.9-1.5-3.5-3.5-3.5zM18 8.6c-.7 0-1.3.5-1.3 1.3s.5 1.2 1.3 1.2 1.3-.58 1.3-1.2-.5-1.3-1.3-1.3z\"/>",
  "image-outline": "<path d=\"M8.5 7.9c.8 0 1.5.6 1.5 1.5s-.6 1.5-1.5 1.5-1.5-.6-1.5-1.5.6-1.5 1.5-1.5m0-1c-1.3 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM16 11.9c.45.0 1.27 1.8 1.7 4.0h-11.3c.4-1.0 1.0-2.0 1.6-2.0.8 0 1.1.1 1.53.42.4.2 1.0.58 1.97.58 1.1 0 1.9-.8 2.6-1.6.6-.6 1.2-1.3 1.8-1.3m0-1c-2 0-3 3-4.5 3s-1.4-1-3.5-1c-2 0-3.0 4-3.0 4h14.0s-1-6-3-6zM22 6c0-1.1-.8-2-2-2h-16c-1.1 0-2 .8-2 2v12c0 1.1.8 2 2 2h16c1.1 0 2-.8 2-2v-12zm-2 12h-16v-12h16.0l-.0 12z\"/>",
  "download": "<path d=\"M16.7 7.4c-.1-.1-.4-.2-.7-.2s-.5.0-.7.2l-2.2 2.2v-6.6c0-.5-.4-1-1-1s-1 .4-1 1v6.6l-2.2-2.2c-.1-.1-.44-.2-.7-.2s-.5.1-.7.2c-.39.39-.39 1.0 0 1.4l4.7 4.6 4.7-4.6c.3-.3.3-1.0-.0-1.4zM20.9 16c0-.1-.0-.2-.0-.3l-2-6c-.1-.4-.5-.6-.9-.6h-.2c-.0.1-.21.3-.3.5l-1.4 1.4h1.3l1.6 5h-13.8l1.6-5h1.3l-1.4-1.4c-.1-.1-.2-.3-.3-.5h-.2c-.4 0-.8.2-.9.6l-2 6c-.0.1-.0.2-.0.3-.0 0-.0 5-.0 5 0 .5.4 1 1 1h16c.5 0 1-.4 1-1 0 0 0-5-.0-5z\"/>",
  "input-checked": "<path d=\"M16 19h-8c-1.6 0-3-1.3-3-3v-8c0-1.6 1.3-3 3-3h5c.5 0 1 .4 1 1s-.4 1-1 1h-5c-.5 0-1 .4-1 1v8c0 .5.4 1 1 1h8c.5 0 1-.4 1-1v-3c0-.5.4-1 1-1s1 .4 1 1v3c0 1.6-1.3 3-3 3zM13.1 14.8c-.35 0-.6-.1-.9-.3l-2.6-2.6c-.52-.5-.52-1.3 0-1.8.5-.5 1.3-.5 1.8 0l1.4 1.4 3.4-5.4c.3-.6 1.17-.8 1.8-.5.6.3.8 1.17.5 1.8l-4.3 7c-.2.3-.5.6-.98.6l-.1.0z\"/>",
  "home-outline": "<path d=\"M22.2 10.4c-3.39-2.8-9.5-8.1-9.6-8.2l-.6-.5-.6.5c-.0.0-6.2 5.3-9.66 8.2-.4.3-.6.9-.6 1.5 0 1.1.8 2 2 2h1v6c0 1.1.8 2 2 2h12c1.1 0 2-.8 2-2v-6h1c1.1 0 2-.8 2-2 0-.5-.2-1.1-.7-1.5zm-8.2 9.5h-4v-5h4v5zm4-8l.0 8h-3.0v-6h-6v6h-3v-8h-3.0c2.7-2.3 7.3-6.2 9.0-7.68 1.6 1.4 6.2 5.3 9 7.6l-3-.0z\"/>",
  "trash": "<path d=\"M18 7h-1v-1c0-1.1-.8-2-2-2h-7c-1.1 0-2 .8-2 2v1h-1c-.5 0-1 .4-1 1s.4 1 1 1v8c0 2.2 1.7 4 4 4h5c2.2 0 4-1.7 4-4v-8c.5 0 1-.4 1-1s-.4-1-1-1zm-10-1h7v1h-7v-1zm8 11c0 1.1-.8 2-2 2h-5c-1.1 0-2-.8-2-2v-8h9v8zM8.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5zM10.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5zM12.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5zM14.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5z\"/>",
  "document-add": "<path d=\"M15 12h-2v-2c0-.5-.4-1-1-1s-1 .4-1 1v2h-2c-.5 0-1 .4-1 1s.4 1 1 1h2v2c0 .5.4 1 1 1s1-.4 1-1v-2h2c.5 0 1-.4 1-1s-.4-1-1-1zM19.7 7.2l-4-4c-.1-.1-.4-.2-.7-.2h-8c-1.6 0-3 1.3-3 3v12c0 1.6 1.3 3 3 3h10c1.6 0 3-1.3 3-3v-10c0-.2-.1-.52-.2-.7zm-2.1.7h-1.0c-.8 0-1.5-.6-1.5-1.5v-1.0l2.5 2.5zm-.5 11h-10c-.5 0-1-.4-1-1v-12c0-.5.4-1 1-1h7v1.5c0 1.3 1.1 2.5 2.5 2.5h1.5v9c0 .5-.4 1-1 1z\"/>"
};
  return Vue.component('icon', {
    data: function () {
      return { svg: '' }
    },
    props: ['id'],
    mounted() {
      var header = '<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">'
      this.svg = header + icons[this.id] + '</svg>'
    },
    template: '<i v-html="svg"></i>'
  })
})();
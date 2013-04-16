mutt
====

Mutt is a node.js library that allows you to seamlessly share view templates between a browser and a thin node.js layer.

This allows you to serve fully-formed HTML pages for any portion of your app, while being capable of reusing the exact same underlying code for generating views on the client.

Initially inspired by [airbnb's rendr](https://github.com/airbnb/rendr), mutt shares a similar vision through a simpler & less opinionated approach (works with any templating library, no dependency on backbone, connect middleware allows for easy integration in a larger app).

Philosphy
---------

In the [holy grail](http://nerds.airbnb.com/slides-and-video-from-spike-brehms-tech-talk) of web applications, both client and server talk to an external API and share:

the capacity to render templates for model, 


How it works
------------

<pre>
              CLIENT
                |    
                |     
                |
                V
      |----------------------|
      |                      |
      |     Reverse Proxy    |
      |   (node-http-proxy)  |
      |----------------------|
          |              |
          | *            | /api/*
          |              |
      |-------|       |-------|    
      |       |       |       |
      |  mutt |------>|  API  |
      |       |   |   |       |
      |-------|   |   |-------|
                  |
           (shared session)
</pre>

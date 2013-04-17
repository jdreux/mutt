mutt
====

Mutt is a node.js library that allows you to seamlessly share view templates between a browser and a thin node.js layer.

This allows you to serve fully-formed HTML pages for any portion of your app, while being capable of reusing the exact same underlying code for generating views on the client.

Initially inspired by [airbnb's rendr](https://github.com/airbnb/rendr), mutt shares a similar vision through a simpler & less opinionated approach (works with any templating library, no dependency on backbone, connect middleware allows for easy integration in a larger app).

Philosphy
---------

In the [holy grail](http://nerds.airbnb.com/slides-and-video-from-spike-brehms-tech-talk) of web applications, both client and server:

* talk to an external API
* share the capacity to render view templates
* share the user session


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

The application stack sits behinds a reverse proxy (the mutt.proxy element). The 'mutt' app is a connect/express web application that uses the mutt.middleware. 

The mutt middleware enables sharing of the session by the express app & the client by copying the original request's authentication cookies onto the internal api request.

The mutt middleware creates a req.api method which is an HTTP REST client to the API. 

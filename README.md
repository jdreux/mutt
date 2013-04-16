mutt
====

A node.js package that enables seamless sharing of view templates between browser and client



How it works
------------

<pre>
              CLIENT
                |    
                |     
                |
                V
      |-------------------|
      |                   |
      |   Reverse Proxy   |
      | (node-http-proxy) |
      |-------------------|
          |          |
          | *        | /api/*
          |          |
      |-------|  |-------|    
      |       |  |       |
      | Mutt  |  |  API  |
      |       |  |       |
      |-------|  |-------|
</pre>

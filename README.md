# son-gui

Gatekeeper GUI designed to cover the needs of the two aforementioned groups, namely service developers and platform administrators in supporting the process of DevOps in SONATA. Gatekeeper GUI is an API management and visualization tool that on one hand enables SONATA developers to manage their services throughout their whole lifecycle, while on the other hand offer Service Platform administrator the ability to provision, monitor and monetize platform resourcess.

### Dependencies

 * Apache 2 Web Server

### Docker support

Build Docker container image 
```
sudo docker build -t sonata-gui .
```

Run Docker container
```
sudo docker run -d -p 4000:80 pkark/sonata-gui

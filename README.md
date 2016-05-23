# son-gui  [![Build Status](http://jenkins.sonata-nfv.eu/buildStatus/icon?job=son-gui)](http://jenkins.sonata-nfv.eu/job/son-gui) 

Gatekeeper GUI designed to cover the needs of the two user groups, service developers and platform administrators in supporting the process of DevOps in SONATA. Gatekeeper GUI is an API management and visualization tool that on one hand enables SONATA developers to manage their services throughout their whole lifecycle, while on the other hand offer Service Platform administrator the ability to provision, monitor and monetize platform resourcess.

### Dependencies

 * Apache 2 Web Server

### Docker support

Build Docker container image 
```
sudo docker build -t sonata-gui .
```

Run Docker container
```
sudo docker run -d -p 80:80 sonata-gui
```

###Lead Developers

The following lead developers are responsible for this repository and have admin rights. They can, for example, merge pull requests.

 * Panos Trakadas  (trakadasp)
 * Panos Karkazis  (pkarkazis)

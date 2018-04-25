

# Code Quality



**Code Quality** is a platform to track and visualize testing code coverage during the entire development cycle. 
So you can easily see all changes and trends.

Why tracking and visualizing your test coverage results?
* It allows seamless cooperation between Team members.
* Develop with the peace of mind that your code is covered.
* Track the progress of your project.
* Track all Branches in your project.
* Clearly see every commit and its essential data.
* takes the pain out of tracking your code coverage.

**Code Quality** is an isomorphic app built using MongoDB, Express.js, React.js, Material-UI, Node.js and Socket.IO for real time updates.


## Demo

![codequalitydemo](https://user-images.githubusercontent.com/22829270/39225292-4ce907f4-4800-11e8-97ff-ec988c895187.gif)





## Getting Started

#### Installation


Clone project.
```
$ git clone https://github.com/jmariomejiap/codeQuality.git
```

install dependencies.
```
$ npm install 
```
or 
```
$ yarn install
```

#### Deploy
___

Deploy **CodeQuality** to your PaaS of choice. (demo example. Heroku)

Create your first project 

![cqcreateproject](https://user-images.githubusercontent.com/22829270/39227592-4f655f74-480e-11e8-96a8-d5cb083b6d00.gif)




#### Configure CI/CD
___

* After project is created use **projectId** as your token in your **CI/CD** environment variables.

add [`CodeQualityCLI`](https://github.com/jmariomejiap/codeQualityCLI) as a dependency to the project to which you want to do codeQuality and follow its instructions on how to configure **CodeQualityCLI** to your **CI/CD**


Things to remember:

Configure your CI/CD environment variables. 

```
  CODE_QUALITY_SERVER_URL = https://<..........>/api/v1/commit
  CODE_QUALITY_TOKEN = the projectId after you created the project
  
```



## Contributing
I welcome contributions! Please open an issue if you have any feature ideas or find any bugs. I also accept pull requests with open arms. I will go over the issues when I have time. :)



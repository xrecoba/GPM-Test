# *SPA* to display a file tree.
## Intro
This repository contains a web application to explore the local file system. It is composed implemented with an Angular SPA that talks to a Clojure backend.

Features:
* Root node is specified by client
* Node hierarchy is represented by indentation
* Nodes with children appear collapsed by default
* Text files can be previewed by clicking on them
* Multiple instances of the application can be executed at the same time using different root node folders

![app screenshot][https://github.com/xrecoba/GPM-Test/blob/master/Resources/AppScreenshot.jpg]

## How to run the application
Checkout repository and execute, in two different consoles:
```
GPM-Test\api-clojure>lein ring server-headless
GPM-Test\spa-angular>ng serve --open
```
Once both angular and clojure servers are running, open http://localhost:4200/.

To run the unit and integration tests, you should run this command:
```
stock-sync-app\stock-sync\Stock.Sync.Tests.Unit>dotnet test
```

> It would have been nice to gift-wrap the application inside a docker container so you could just run it with a single command no matter the OS and system. Sorry I was short on time.

## Known bugs
* Some folders do not return dir info although we display them in the folder list ("Archivos de programa", hidden folders, ...)
* Button to expand a folders appears even when folder is empty. Same happens for collapsing.
* File preview contents are concatenated.

# Assumptions
* I've considered _*.txt_ files as the leaf nodes respresenting text files
* I've considered the first ten lines of a file as its preview
  * If a file has less or 10 lines, then the whole file is shown
  * There's no UI visual cue indicating if a file is fully displayed or previewed

# Code structure
The repository is pretty simple, it has 2 main folders, one for the Angular SPA client and the otherfor the Clojure API.

# Design choices
I firmly believe in keeping thins as simple as possible, so I speak about a lot of possibilities here that I would include in the final implementation only once it is proven they are necessary.

## General
* No input validation
* No logging
* No localization
* No accessibility
* No security

## API
I've decided to make a REST API because:
* File system is a good fit for the REST protocol (folders and files being resources)
* This kinf of application can benefit from inherent caching bound to REST (intermediate servers storing GET requests for example)
* The expected behavior can be clearly expressed in a HATEOAS way, as folders contain subfolders which can be expanded and files that sometimes can be previewed, and those actions are links embedded in the API responses. If the API ever changes the way it organizes endpoints, the client will hopefully not have to change as it will just continue to call the endpoints provided by the API.

* Endpoints:
  * _GET /dir_ - Returns the list of elements in one directory. The directory is specified in the path query string parameter.
    *     http://localhost:3000/dir?path=c:/AnyGivenFolder
  * _GET /preview_ - Returns a preview of a given file
    *     http://localhost:3000/preview?path=c:/AnyGivenFolder/AnyGivenTxtFile.txt

> **Disclosure** 
I'm aware this API is not compliant with REST principles. The resources of files and folders should be specified via the   URL and not in the query string parameter path. Unfortunately, my low level in Clojure in combination with lack of time made me take some shortcuts.
Had it been possible, I would have made this url to get the contents of AnyGivenFolder:
http://localhost:3000/c/AnyGivenFolder
And this one to retrieve a file (preview parameter would be optional, without it the URL would be used to retrieve the full file):
http://localhost:3000/c/AnyGivenFolder/AnyGivenFile.txt?preview=true

## Data structures
* Dir endpoint returns a list of JSONs. 
All of them have at least path, name and directory (boolean, when true it is a directory - not really proud of this name, the mere fact it requires an explanation is a smell, but I adhered to the standard and used the same name as the Java property). 
  * Directories have an extra property _dirUrl_, which provides the url where we can request a dir of the folder:

```json
{
      "path": "c:\AnyGivenFolder\AnyGivenSubFolder",
      "name": "dnis",
      "directory": true,
      "dirUrl": "http://localhost:3000/dir?path=c:\AnyGivenFolder\AnyGivenSubFolder"
}
```
  * Previewable files have an extra property _previewUrl_. Again, it provides the url where we can request a preview of the file. Non previewable files just do not have the property.

```json
{
        "path": "c:\AnyGivenFolder\AnyGivenTxtFile.txt",
        "name": "AnyGivenTxtFile.txt",
        "directory": false,
        "previewUrl": "http://localhost:3000/preview?path=c:\AnyGivenFolder\AnyGivenTxtFile.txt"
    }
```

## SPA
I've used Angular 4 to build the SPA application. I have very low experience with SPA frameworks and after a small tour, I decided to go for NG4. I liked the simplicity, the syntax and it just worked for the exercice at hand.

The SPA is built around 4 major blocks:
* _file-tree_ - A component to recursively display a file tree, allowing node expanding and collapsing. 
* _file-preview_ - A component to preview file contents.
* _node-service_ - A service encapsulating the logic to access the API. It is also responsible of the communication between the different components, as it raises an event when a file is selected for preview in the file-tree so the file-preview component can get the notification.
*  _AppComponent_ - The app root element, that orchestrates the whole the application.

### Considerations
* Nothing is cached on the SPA. If after collapsing a node, the user expands it again, it will go to the API (again) to retrieve the folder contents.
* _file-tree_ component is the responsible of setting the property where we store if a node has been expanded or not. This information is used only for visualization and it made no sense in the API response. It could have been added to the node element in the service, but as it is only used in this component I preferred have the code setting the value inside this component.
* If the SPA requires a high degree of autonomy or very special caching features, I would consider usage of [service workers](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker).
* The HTML sucks. It is not responsive nor nice, I know it. I understand it is not the purpose of this exercice. If it were, I would move it to Bootstrap and apply some icons via CSS to make it nicer.

## Testing
IMHO, I see development as a holistic activity, hence I consider testing as part of the development process. To properly test this App I could define this set of tests (note most of them would require input from the PO to determine the expected outcome. Also, some can be considered as negligible, depending on the criticity and context of the system being used):
* Empty root folder (so, nothing to render)
* Folders with lots of files
* Different drives
* Check it works with Virtual folders
* Files with different file encodings
* Files and folders with strange characters
* Hidden files
* Huge file
* Empty file
* Corrupted txt file for preview
* Files with different file encodings
* Changing folder content between reads
* Changing file content between reads

Another thing worth testing is the compatibility matrix with different web browsers and devices (cell phones for example).
In case API and clients are expected to run in different machines, we could also be checking combinations of OS, or try to mingle with time-zones for example.

### Pending
In  a real world project, several other things would be missing in the code and repository as it is nowadays:
1. **Continuous Delivery/Continuous Integration** - The code to compile, build and run test and static code analysis (hopefully inside a Docker container) should be included in the repository, so every developer can checkout and start working anytime on any machine. Also, the CD pipeline could be included (or else stored in another repo).
2. **Logging** - Logging information is a must to find out problems in production. As of now there's no logging.
3. **Versioning** - I lately tend to avoid versioning when possible. I have different versions of my bianries but I do not expose versions of APIS, I prefer just to expose the latest version and try to make all my changes backward compatible. In case it is mandatory (selling API to customers who can't keep the update pace), then version management is a must, specially once you go into CD world to track the multiple versions of your code. In general I follow [semver](http://semver.org/) which is has been a good fit for most of the projects I've worked on. 
4. **Monitoring** - As of now there's no monitoring configured. In a real-world API having something like [NewRelic](https://newrelic.com/) or [app insights](https://azure.microsoft.com/en-us/services/application-insights/) is a must to keep track of your production state.
5. **Exception management** - Current exception management is poor. In .Net I tend to use DI interceptors to manage exceptions and logging. Had no time to do it and prioritized other stuff and I have no clue how would I do that in Clojure but anyway, without that part it is not possible to go live.
6. **Documentation** - If the application is to be consumed from the outside world or other colleagues from our company, then some kind of documentation is necessary, also input validation.
7. **Resiliency** - To handle and minimize potential network errors or server-side crashes, I would wrap calls to the API inside retrials and a [circuit breaker](https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern), especially if the app is meant to be executed with machines in the cloud. 
8. **Security** - Binaries would have to be signed so we are sure that no one is poking around with the binaries that reach production.
9. **Load Test** - Once we know the expected load of the API, we can define Load tests to validate the behavior of the app under expected workload. These tests should also be under source control, and can also be used to stress test the system looking for its weakest link. In case we do expect small load for the API, then we may decide to skip load testing.
10. **Rebasing the pull-request** - I have left all my commits as is. In a normal PR I would rebase them to make my merge more readable and consistent.

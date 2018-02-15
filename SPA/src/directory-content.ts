import {HttpClient} from 'aurelia-fetch-client';

export class DirectoryContent {
	files;

	let client = new HttpClient();
	
	constructor(){}

	created(){

		 httpClient.configure(config => {
		      config
		        .withBaseUrl('api/')
		        .withDefaults({
		          credentials: 'same-origin',
		          headers: {
		            'Accept': 'application/json',
		            'X-Requested-With': 'Fetch'
		          }
		        })
		        .withInterceptor({
		          request(request) {
		            console.log(`Requesting ${request.method} ${request.url}`);
		            return request;
		          },
		          response(response) {
		            console.log(`Received ${response.status} ${response.url}`);
		            return response;
		          }
		        });
		    });

		let client = new HttpClient();

		client.fetch('package.json')
      		.then(response => response.json())
      		.then(data => {
        		console.log(data.description);
      });

	}
}
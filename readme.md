# Posty McPostface!

## Create markdown posts for Jekyll locally and easily with this little Desktop UI.

### About the app

I created this Electron app as a quality of life improvement for my work team. We had just recently switched from Wordpress to Jekyll for our content managed sites and needed a quick and easy way to add content without touching code much like we did with Wordpress.

### How to use it

**Note**: This is 100% intended to be paired with Jekyll and as an intra-office tool and our use-case is very simple. I made the app over the span of a few weeknights and plan to expand it when I find time. I am mainly writing this readme so that future me isnt scratching my head when working on/testing this code.

Eventually my goal is for this app to be used with any SSG (static site generator) or blog site that sources it content from markdown files.

Anyways, I reccomend you install Git Kraken if you truely want a codeless approach.

- clone the repo (I will provide a download link to install the app one of these days.)

- add deps "npm install"

- to start "npm start"

- to build (electron-forge) "npm run make"

- You now have the app .exe located in the out/post-mcpostface directory

- double click the .exe and start writing your first post!

- save the post by selecting the main directory of your site ex: C:/code/myblogsite.com, the post will be saved to the default Jekyll posts directory within the site. If uploading an image, it will automatically be added to the proper image folder along with a Jekyll-approved file name to match it with the post.

- finally now that the post and image are saved within the local site, push your changes up to your site's Git repo and deploy away to see your little post baby live on the web.

I created and tested this on Windows only.

#### Happy coding!

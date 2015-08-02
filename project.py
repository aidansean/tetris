from project_module import project_object, image_object, link_object, challenge_object

p = project_object('tetris', 'Generic block stacking game')
p.domain = 'http://www.aidansean.com/'
p.path = 'tetris'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'tetris'
p.mathjax = False
p.tags = 'Games'
p.technologies = 'AJAX,CSS,HTML,JavaScript,MySQL,PHP'
p.links.append(link_object(p.domain, 'tetris/', 'Live page'))
p.introduction = 'This was my first serious Javascript project which was written some time in 2009.  I chose to write a Tetris clone because it was a well defined project that would teach me how to use Javascript.  In addition to Tetris I also made Tritris and Pentris to see how well balanced the three games are compared to each other.  It turns out that Tetris is about right, with Tritris being too easy and Pentris being too hard.'
p.overview = '''The user plays the game with the arrow keys, and the game gets slowly faster as their score increases.  There is a MySQL and PHP backend to save scores on the server.  As much as possible, the three games have been harmonised so that they use the same page, the same Javascript library, and the same PHP page for interaction with the server.  This is outlined in <a href="http://aidansean.com/projects/?p=473">a previous post</a> where I discussed how the code was refactored.  This is one of my favourite projects, as it's one of the few "complete" projects that touches on almost all of Javascript, with some HTML, CSS, PHP, MySQL, httpxml, and cookies also thrown in there.  This project taught me so much about Javascript and was an excellent start with the language.'''

p.challenges.append(challenge_object('This project required learning how to use Javascript.', 'What a challenge!  Having worked previously with C++, I found that Javascript was rather easy to learn, and quickly came across its peculiarities and limitations.', 'Resolved'))

p.challenges.append(challenge_object('The project required detailed manipulation of the DOM.', 'It was with this project that I learned how to use the DOM, which helped me to better understand the heirarchical structure of XML in general.  I also wanted the HTML to be semantically pure, so while I used the DOM to store some information about the state of the game, I also ensured that it was semantically consistent.', 'Resolved'))

p.challenges.append(challenge_object('This game required careful control of Javascript events and synchronisation.', 'This was probably the most difficult and instructive part of the project.  I had to learn how to register event handlers in a manner which worked across browsers.  I still use the same style of event handling today that I developed when I wrote this project.  It took a while to get used to the issues of synchronisation using the <tt>window.setTimeout</tt> method, which I still use frequently today.', 'Resolved'))

p.challenges.append(challenge_object('I had to store some data on the server.', 'I had had plenty of experience with PHP and MySQL before this project, including sanitising input to the database, so the PHP side of this challenge was easy to implement.  However making the httpxml requests was not so easy and took some practice.  After a few iterations I got a working model, although this is something I should improve further, as httpxml requests tend to be rather messy.', 'Resolved'))

p.challenges.append(challenge_object('One of the users wanted a feature that required cookies.', 'One user spent so long playing the game that he wanted to be able to "block" himself.  As a result I had to implement a feature hat sets a cookie that prevents the user from playing.  This was the first time I had set and read cookies using Javascript, and not something I have had much use for since.', 'Resolved'))

p.challenges.append(challenge_object('The game has a soundtrack.', 'Having used so many feature of Javascript, I wanted to add some music.  This is far from trivial in the world of Javascript, and not so easy in the days befre embedded YouTube videos.  Although support is a little shaky, the music was added and an interface included.', 'Resolved'))

p.challenges.append(challenge_object('The game had to have cross browser support.', 'This game was initially developed using Firefox, but one of the users wanted it to work with Chrome.  This was the first time I met the frustration of cross browser event handling, which has been something of a pain ever since, but it was not too hard to overcome.', 'Resolved'))

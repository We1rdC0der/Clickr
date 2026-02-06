# Clickr

![Clickr 0.1.2 realse img](readmefiles/0-1-2.jpg)
   
Clickr is a **Node.js app** that you can use on **any device** with a browser.
With Clickr (pronouced click-er) you can **fully costomize** a clock, the date, and your local weather (for US only).

---

## Whats to come

Our insights with Clickr are to be able to control your PC, and Home Assistant Dashboard with old phones, tablets, or even a old computer.  

---

## What you need to use Clickr

1.) A small computer ( like a raspberry pi, or home server)
2.) A Windows or Linux OS
3.) The latest vertion of Node.js
4.) An Internet Conection

---

## How to Install Clickr

###Clone this Github Repo
    1.) Open the Offical [Clickr Github](https://github.com/We1rdC0der/Clickr) page
    2.) Look for the latest release (normaly Located on the right hand side under the about section)
    3.) Download the .zip file of Clickr by clicking "Source Code (zip)"
    4.) From your downloads, copy and paste the Clicker source code file into the Desktop of your PC
    5.) Then Right click the Clicker source code file and press Extract here 
    6.) Delete the old zip file 

    **Now you have the github repo on your desktop this will make for easy use of updating and startup**

    ### Add Node files into the Clickr Folder
    1.)Open the Clickr folder in your file explorer
    ** On Windows follow the following steps, then skip to step 5. For Linux Skip to step 4**
    2.) Right click the background of the Clickr folder
    3.) Press open in termanel
     **Please skip to step 5 for for further instruction**
    4.) Open your temanel then run the code ```cd (YOUR-PATH-TO-CLICKR-FOLDER-HERE)``` Where it says "(YOUR-PATH-TO-CLICKR-FOLDER-HERE)" Please enter the path to your Clicker Folder.
    **Now you should have a termanel dicrected to the Clickr folder**
    5.) Run the code ```npm init -y``` 
    6.) After the first code is finished running, run this line next: ```npm install express socket.io``` 
    
    This will install Node into the Clickr folder. **if you dont install node, then you will not be able to use Clickr.**

    ###Starting Clickr
    1.)in the termanel (told how to get there in the Add Node Files into the Clickr Folder instruction) run the code ```node server.js``` 
    2.)in the PC's browser open [http://localhost:3000](http://localhost:3000)
     **Now clicker should be running in your PC's Browser**

     ###Use clickr on another device 
     1.) Find your Pc's Local IP Adress 
     2.)Make sure the device is conected tom the same Wi-fi as the PC
     3.) Open the devices browser and put "(your-local-ip):3000" in the URL bar
     **Now Clickr should be running on that device!**

    
    

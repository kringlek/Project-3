from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
from webdriver_manager.chrome import ChromeDriverManager
import re

def scrape_gifs():      
        # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url = "https://bmcnoldy.rsmas.miami.edu/tropics/radar/"
    browser.visit(url)

    time.sleep(1)

    def not_lacie(href):
        return href and not re.compile('lacie').search(href)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    # hurricane_container = soup.find(id=True)
    # hurricane_list = hurricane_container.find('ul')
    # list = hurricane_list.find('a')
    # print(list)
   
    for element in soup.find_all('ul'):
        anchor = element.li
        href = anchor.find('a')['href']
        print(href)

  


        

        # hurricane_list = hurricane_list.find('a')['href']

        # gif_list =[]

        # gif_list.append(hurricane_list)

        # print(gif_list)

        # for x in hurricane_list:

        #     hurricane_container = hurricane_list.find("ul")

        #     list = hurricane_container.find('a')['href']

        #     gif_url = "https://bmcnoldy.rsmas.miami.edu/" + list

        #     print(gif_url)
    #     gif_list = []

    # browser.quit()
    # return gif_list
scrape_gifs()
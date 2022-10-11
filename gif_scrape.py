from turtle import pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
from webdriver_manager.chrome import ChromeDriverManager
import re
import pandas as pd
# import numpy as np

def scrape_gifs():      
        # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url = "https://bmcnoldy.rsmas.miami.edu/tropics/radar/"
    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")


#Read in Data from CSV
    hurricane_csv = "Data/hurricane_clean_dataset.csv"
    hurricane_data = pd.read_csv(hurricane_csv)
    hurricane_data.head()
    df1 = hurricane_data
    nums = '\d+'


# for loop for getting all of the hrefs on the page and filtering to only return the .gifs
    href_array = []
    for link in soup.find_all('a', attrs={'href': re.compile("^tropics")}):
        href_array.append(link.get('href'))
        # if WHATEVER does not end in '.gif' drop from array
        

        print(href_array)

        df = pd.DataFrame(href_array, columns=['gif_url']) 

        gif_df = df[df['gif_url'].str.endswith('.gif')]

        print(gif_df)

    # browser.quit()

    for gif in href_array:
        gif_name = gif.split('/')
        gif_name_list = (re.split(nums, gif_name[1]))
        # print(gif_name_list)

        joined_names = ' '.join(gif_name_list).split()

        def clean_gif_names(x):
            return list(dict.fromkeys(x))
        
        cleaned_names = clean_gif_names(joined_names)

        print(cleaned_names)

        # clean_gif_name = gif_name[1]
        # print(clean_gif_name)

    # print(good_gifs)


scrape_gifs()


# filter out name of hurricane from gif href url to be able to match to your data
# remove multiples of the same hurricanes
# concat page url with gif href
# append/join hurricane gifs to data set

   # inside for loop create another for loop to remove empty strings from the results
    # first append each gir_name_list into a list of lists for the for loop
    # then run code inside that for loop that removes empty strings
    # remove duplicate names from the list
    # match name with hurricane gif url dropping any unmatched results
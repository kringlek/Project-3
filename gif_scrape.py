# from turtle import pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
from webdriver_manager.chrome import ChromeDriverManager
import re
import pandas as pd
import numpy as np
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from IPython.display import display
with pd.option_context('display.max_rows', 500, 'display.max_columns', 3):
    

    def get_hurr_ids():
        hurricane_data = pd.read_json("static/js/test.json")
        hurricane_data["Year"] = hurricane_data["Year"].astype(str)
        hurricane_data["id"] = hurricane_data["Name"].str.lower() + hurricane_data["Year"].str.slice(start=2)
        return hurricane_data["id"].unique().tolist()

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


    #Read in Data from json
    hurricane_data = get_hurr_ids()
    nums = '\d+'


    # for loop for getting all of the hrefs on the page and filtering to only return the .gifs
    href_array = []
    hurricanes = []
    for link in soup.find_all('a', attrs={'href': re.compile("^tropics")}):
        # print(link)
        href_link = link.get('href')
        # print(href_link)
        
        for hurricane in hurricane_data:
            hurricane_link = "tropics/" + hurricane
            if href_link.startswith(hurricane_link):
                # print()
                href_array.append(href_link)
                hurricanes.append(hurricane)
        
        
        # print(href_array)

    df = pd.DataFrame({'hurricane': hurricanes,
                        'gif_url': href_array})
    # print(len(df.index))
    # print(df.head())

    # if WHATEVER does not end in '.gif' drop from array
    gif_df = df[df['gif_url'].str.endswith('.gif')]

    # clean up df
    gif_df = gif_df.drop_duplicates(subset=["hurricane"], keep='last')
    gif_df = gif_df.reset_index(drop=True)
    gif_df["name"] = gif_df["hurricane"].str.slice(stop=-2)
    gif_df["name"] = gif_df["name"].str.capitalize()
    gif_df["year"] = gif_df["hurricane"].str.slice(start=-2)
    gif_df["full_year"] = gif_df["year"].apply(lambda x: "20" + x if int(x) < 50 else "19" + x)
    gif_df["id"] = gif_df["name"] + " " + gif_df["full_year"]

    final_df = gif_df[["gif_url", "id"]]

    # print(gif_df.head())
    # print(len(gif_df.index))
    
    final_df.to_json('static/js/gif_scrape.json')

    # print(gif_df)

        # gif_df.filter(items=[0, 24, 100, 107, 110, 128, 159, 191, 194, 449, 462, 465,472,
        # 475, 482, 485, 487, 490, 492, 497, 498, 499, 503] ,axis=0)

    # for gif in href_array:
    #     gif_name = gif.split('/')
    #     gif_name_list = (re.split(nums, gif_name[1]))
    #     # print(gif_name_list)

    #     joined_names = ' '.join(gif_name_list).split()

    #     def clean_gif_names(x):
    #         return list(dict.fromkeys(x))
        
    #     cleaned_names = clean_gif_names(joined_names)

    #     print(cleaned_names)

    # final_series=pd.Series(cleaned_names)
    # myFinalList = pd.unique(final_series).tolist()
    # print(myFinalList)
    # print(href_array)
    
        # clean_gif_name = gif_name[1]
        # print(clean_gif_name)

    # print(good_gifs)





# inside for loop create another for loop to remove empty strings from the results
# first append each gir_name_list into a list of lists for the for loop
# then run code inside that for loop that removes empty strings
# remove duplicate names from the list
# match name with hurricane gif url dropping any unmatched results

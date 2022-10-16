from turtle import pd
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

            # print(href_array)


            df = pd.DataFrame(href_array, columns=['gif_url']) 

            # df['id'] = df.index + 1

        gif_df = df[df['gif_url'].str.endswith('.gif')]

            # gif_df["id"] = gif_df.index
    #     pd.set_option('display.height', 500)
        # pd.set_option('display.max_rows', df.shape[0]+1)
        # print(gif_df)

        # gif_df.filter(items=[0, 24, 100, 107, 110, 128, 159, 191, 194, 449, 462, 465,472,
        # 475, 482, 485, 487, 490, 492, 497, 498, 499, 503] ,axis=0)

        # print(gif_df.filter(items=[0, 24, 100, 107, 110, 128, 159, 191, 194, 449, 462, 465,
        #         472, 475, 482, 485, 487, 490, 492, 497, 498, 499, 503],axis=0))

        browser.quit()

        clean_name_array = []

        for gif in href_array:
            gif_name = gif.split('/')
            gif_name_list = (re.split(nums, gif_name[1]))

            # print(gif_name_list)

            joined_names = ' '.join(gif_name_list).split()

            # def clean_gif_names(x):
            #     return list(dict.fromkeys(x))
            clean_name_array.append(joined_names)   

            # print(cleaned_names)

        # clean_name_array = list(dict.fromkeys(clean_name_array))

        # print(clean_name_array)

        flat_list = [i for sublist in clean_name_array for i in sublist]

        # print(flat_list)


        final_series=pd.Series(flat_list)
        myFinalList = pd.unique(final_series).tolist()
        # print(myFinalList)

        df_name = pd.DataFrame(myFinalList, columns=['name'])

        # print(df_name)
        # print(myFinalList)

        gif_list1 = gif_df['gif_url'].tolist()

        gif_name_list = myFinalList
        threshold = 60

        m1=[]
        m2=[]

        for i in gif_list1:
            m1.append(process.extract(i, gif_name_list, limit=1))
        
        # print(m1)
        
        gif_df['match'] = m1

       # print(gif_df)

        # print(gif_list1)
        p=[]
        for j in gif_df['match']:
            for k in j:
                if k[1]>=threshold:
                    p.append(k[0])
            m2.append(','.join([str(i) for i in p]))
            p=[]
        gif_df['match_real']=m2
        print(gif_df.head(20))









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
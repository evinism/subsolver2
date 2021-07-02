# 
# https://www.sparknotes.com/lit/
# -> ".hub-AZ-list__card__title__link".href to get link.

from bs4 import BeautifulSoup
import requests
import json

root_dir = "https://www.sparknotes.com"

lit_page = requests.get(f"{root_dir}/lit/").text
soup = BeautifulSoup(lit_page, "html.parser")

book_links = []

for link in soup.select("a.hub-AZ-list__card__title__link"):
  book_links.append(root_dir + link['href'])

### Getting Quotes

quotes = []

def extract_quote(base, extension):
  page = requests.get(base + extension).text
  soup = BeautifulSoup(page, "html.parser")
  quote = soup.select_one(".mainTextContent__quote__line").text
  if (len(quote) > 400) and (len(quote) < 800):
    quotes.append([quote, base])
  

for link in book_links:
  pre_length = len(quotes)
  try:
    extract_quote(link, "quotes/")
    for i in range(2, 6):
      extract_quote(link, f"quotes/page/{i}/")
  except AttributeError:
    pass
  if len(quotes) > pre_length:
    print(f"Found {len(quotes) - pre_length} quote(s) in {link}")

print(f"{len(quotes)} quote(s) found in total")

### Writing to disk

with open("/tmp/quotes", 'w') as f:
  f.write(json.dumps(quotes, indent=2))
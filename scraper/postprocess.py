import json
import re
import requests
from bs4 import BeautifulSoup

with open("/tmp/quotes", 'rb') as f:
  quotes = json.load(f)

cleaned_quotes = []

print("Cleaning quotes!!")
for unclean, link in quotes:
  unclean = re.sub(r"^\t?\"", " ", unclean)
  unclean = re.sub(r"\t", "\n", unclean)
  unclean = re.sub(r"\"\n?$", "", unclean)
  unclean = re.sub("\r\n", "\n", unclean)
  unclean = re.sub("\n", " ", unclean)
  unclean = re.sub(r"(^\s*)|(\s*$)", "", unclean)
  unclean = re.sub(r"\s+", " ", unclean)
  clean = unclean
  cleaned_quotes.append([clean, link])

print("Done!")

def get_title_and_author(link):
  try:
    html = requests.get(link).text
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.select(".TitleHeader_title")[0].text.strip()
    author = soup.select(".TitleHeader_authorName__header")[0].text.strip()
    return title, author
  except:
    return None

output = []

id = 30

for clean, link in cleaned_quotes:
  res = get_title_and_author(link)
  if not res:
    continue
  title, author = res
  print(clean)
  print(title + " -- " + author)
  ans = input("keep? (y/n)")
  if ans == "y":
    output.append({
      "id": str(id),
      "text": clean,
      "author": author,
      "origin": "Excerpt from *" + title + "*",
      "notes": "Via Sparknotes"
    })
    id += 1
  elif ans == "break":
    break

with open("/tmp/quotes-cleaned.json", 'w') as f:
  json.dump(output, f)
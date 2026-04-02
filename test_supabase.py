import os
import requests

url = "https://auxfxdttbhhmnnutbemn.supabase.co/rest/v1/"
key = "sb_publishable_k7zhNdNo9JR-v7o-1ewSRw_3JZC1cWJ" # Stripped brackets

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}"
}

try:
    # Just checking an arbitrary endpoint or the root schema
    response = requests.get(url, headers=headers)
    print("Status:", response.status_code)
    print("Response:", response.text[:200])
except Exception as e:
    print("Error:", e)

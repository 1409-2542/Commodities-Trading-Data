import requests
from bs4 import BeautifulSoup
import mysql.connector
from datetime import datetime

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="agna",
    password="ag9892na",
    database="commodities_trading_data"
)

cursor = db.cursor()

# TradingEconomics Commodities URL
URL = "https://tradingeconomics.com/commodities"

# Mapping of your commodities to TradingEconomics names
commodity_map = {
    "WTI Crude Oil": "Crude Oil",
    "Brent Crude Oil": "Brent",
    "US Natural Gas": "Natural gas",
    "Europe Natural Gas": "TTF Gas",
    "UK Natural Gas": "UK Gas",
    "Steel": "HRC Steel",
    "Iron Ore": "Iron Ore CNY"
}

def fetch_commodity_prices():
    """Scrapes TradingEconomics for live commodity prices."""
    response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"})
    
    if response.status_code != 200:
        print("Failed to fetch data")
        return

    soup = BeautifulSoup(response.text, "html.parser")
    data = {}

    # Debugging: Print the raw HTML
    print(soup.prettify())  # To see the structure of the page

    # Find all table rows containing commodity data
    rows = soup.select("table.table-hover tbody tr")

    for row in rows:
        # Extract the name (from <b> inside first <td>)
        name_tag = row.find("td", class_="datatable-item-first").find("b")
        if name_tag is None:
            continue  # Skip rows without a valid name

        name = name_tag.text.strip()
        
        # Extract the unit (from <div> inside first <td>)
        unit_tag = row.find("td", class_="datatable-item-first").find("div")
        unit = unit_tag.text.strip() if unit_tag else ""
        
        # Extract the price (from second <td>)
        price_tag = row.find_all("td")[1]
        price = price_tag.text.strip()
        
        if not price:
            continue  # Skip rows with missing price data

        # Extract daily change value & determine if it's positive or negative
        daily_change_td = row.find_all("td")[2]
        daily_change_value = daily_change_td.text.strip()  # Raw number (always positive)
        daily_change_value = float(daily_change_value.replace(",", "")) if daily_change_value else 0.0

        # Check for the presence of positive or negative class
        if daily_change_td.find("span", class_="market-negative-image"):
            daily_change_value *= -1  # Make it negative
        # If positive class exists, value remains positive (default behavior)

        # Extract percent change (fourth column)
        percent_tag = row.find_all("td")[3]
        percent_change = percent_tag.text.strip().replace("%", "")

        # Extract the date (from the last <td>)
        # Extract date (last column)
        date = row.find_all("td")[-1].text.strip()

        # Handle date formats: "Feb/09" or "HH:MM"
        try:
            # Check if date is "Feb/09"
            if '/' in date:  # "Feb/09" format
                date_parsed = datetime.strptime(date, "%b/%d")
                formatted_date = date_parsed.replace(year=datetime.now().year)  # Add current year
                formatted_date = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

            # Check if date is "HH:MM"
            elif ':' in date:  # "HH:MM" format
                time_parsed = datetime.strptime(date, "%H:%M")
                formatted_date = datetime.now().replace(hour=time_parsed.hour, minute=time_parsed.minute, second=0)
                formatted_date = formatted_date.strftime("%Y-%m-%d %H:%M:%S")
                
            # Handle unexpected date formats
            else:
                # If it's not in "Feb/09" or "HH:MM" format, use the current timestamp as fallback
                formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        except ValueError as e:
            print(f"Error parsing date: {date}, using current time.")
            formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Fallback to current date/time
                    
        last_update = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Debugging: Print the columns and extracted values
        print(f"Commodity: {name}, Price: {price}, Unit: {unit}, Change: {daily_change_value}, Percent: {percent_change}%, Date: {date}")

        cursor.execute("SELECT name FROM commodities WHERE name = %s", (name,))
        result = cursor.fetchone()

        if result:  # ✅ Exact name match found in database
            data[name] = {
                "price": float(price.replace(",", "")),
                "daily_change" : daily_change_value,
                "percent_change" : float(percent_change) if percent_change else 0.0,
                "last_update": last_update,
                "date": formatted_date  # Store the date
            }
            print(f"✅ Exact match found: {name} → Updated directly.")
            continue  # Move to next commodity since it's already updated

        # 2️⃣ If no exact match, check the `commodity_map`
        for db_name, scraped_name in commodity_map.items():
            if name == scraped_name:  # Check for mapped name match
                data[db_name] = {
                    "price": float(price.replace(",", "")),
                    "daily_change": daily_change_value,
                    "percent_change": percent_change,
                    "last_update": last_update,
                    "date": formatted_date  # Store the date
                }
                print(f"✅ Mapped match found: {name} → Updated as {db_name}.")
                break  # No need to check further mappings

    return data        

def update_database(prices):
    """Updates only the price of commodities in the database."""
    for commodity, values in prices.items():
        # Fetch the commodity_id from the database
        cursor.execute("SELECT id FROM commodities WHERE name = %s", (commodity,))
        result = cursor.fetchone()
        
        if result:
            commodity_id = result[0]

            # Update only the price and updated_at fields
            cursor.execute("""
                UPDATE prices 
                SET price = %s, 
                    daily_change = %s, 
                    percent_change = %s, 
                    date = %s, 
                    updated_at = %s
                WHERE commodity_id = %s
            """, (values["price"], values["daily_change"], values["percent_change"], values["date"], values["last_update"], commodity_id))

    db.commit()

if __name__ == "__main__":
    prices = fetch_commodity_prices()
    
    if prices:
        update_database(prices)
        print("Database updated successfully!")
    else:
        print("No data updated.")

cursor.close()
db.close()
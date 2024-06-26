from dotenv import load_env
import requests
import yaml

load_env()

URL = f"https://discord.com/api/v9/applications/{APPLICATION_ID}/commands"

with open("commands.yaml", "r") as file:
  yaml_content = file.read()

commands = yaml.safe_load(yaml_content)
headers = {"Authorization": f"Bot {TOKEN}", "Content-Type": "application/json"}

for command in commands:
  response = requests.post(URL, json=command, headers=headers)
  command_name = command["name"]
  print(f"Command {command_name} created: {response.status_code}")

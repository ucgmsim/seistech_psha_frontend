# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.common import exceptions
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options
import glob
import os

chrome_options = Options()
if os.environ.get('HOST_NAME') and os.environ['HOST_NAME'].startswith("travis"):
    chrome_options.add_argument("--headless")

def wait_and_click_button(driver,target_by,target_keyword):
    #works with a button usually searched by CSS_SELECTOR
    def this_button():
        return driver.find_element(target_by,target_keyword)

    while this_button().get_attribute('disabled') != None:
        print("Wait: "+target_keyword+" not ready")
        time.sleep(5)

    this_button().click()

def wait_and_click(driver, target_by, target_keyword):
    #works with ordinary links or standard HTML elements searched by ID, XPATH or LINK_TEXT
    while True:
        try:
            driver.find_element(target_by, target_keyword).click()
        except exceptions.ElementClickInterceptedException:
            print("Wait: "+target_keyword+" not ready")
            time.sleep(5)
        else:
            break


def clear_input_field(driver,target_by,target_keyword):
    def this_field() :
        return driver.find_element(target_by, target_keyword)
 
    while this_field().get_attribute('value')!='':
        this_field().send_keys(Keys.BACKSPACE)


class TestComputeHazardDisagg():
  def setup_method(self, method):
    self.driver = webdriver.Chrome(options=chrome_options)
    self.vars = {}
    try:
        self.deploy_name=os.environ['DEPLOY_NAME']
    except:
        self.deploy_name="psha-test"

  def teardown_method(self, method):
    self.driver.quit()
  
  def test_computeHazardDisagg(self):
    self.driver.get("https://{}.seistech.nz/".format(self.deploy_name))
#    assert self.deploy_name == 'psha-test'

    self.driver.set_window_size(1680, 1027)
    self.driver.find_element(By.ID, "qs-login-btn").click()
    self.driver.find_element(By.ID, "username").click()
    self.driver.find_element(By.ID, "username").send_keys("sungeunbae@live.com")
    self.driver.find_element(By.ID, "password").send_keys("Yonsei96!")
    self.driver.find_element(By.NAME, "action").click()

    #Wait until the page is loaded
    WebDriverWait(self.driver, 30000).until(expected_conditions.presence_of_element_located((By.LINK_TEXT, "Hazard Analysis")))
    wait_and_click(self.driver,By.LINK_TEXT, "Hazard Analysis")

    clear_input_field(self.driver,By.ID,"haz-lat")   
    self.driver.find_element(By.ID, "haz-lat").send_keys("-43.60")

    clear_input_field(self.driver,By.ID,"haz-lng")   
    self.driver.find_element(By.ID, "haz-lng").send_keys("172.72")
    self.driver.find_element(By.ID, "site-selection").click()

    wait_and_click(self.driver, By.LINK_TEXT, "Seismic Hazard")

    wait_and_click(self.driver, By.XPATH,"//div[@id='IMs']/div/div")
    self.driver.find_element(By.ID, "react-select-2-option-0").click() #PGA
    self.driver.find_element(By.ID, "im-select").click()

    wait_and_click_button(self.driver, By.CSS_SELECTOR, ".hazard-curve-viewer > .download-button")
    time.sleep(10)

    self.driver.find_element(By.ID, "disagg-annual-rate").clear()
    self.driver.find_element(By.ID, "disagg-annual-rate").send_keys("0.2")
    self.driver.find_element(By.ID, "prob-update").click()
 
    wait_and_click_button(self.driver, By.CSS_SELECTOR, ".disaggregation-viewer > .download-button")
    time.sleep(10)
   
    clear_input_field(self.driver,By.ID,"uhs-annual-rate")
    self.driver.find_element(By.ID, "uhs-annual-rate").send_keys("0.01")
    self.driver.find_element(By.CSS_SELECTOR, ".uhs-add-btn").click()

    clear_input_field(self.driver,By.ID,"uhs-annual-rate")
    self.driver.find_element(By.ID, "uhs-annual-rate").send_keys("0.012")
    self.driver.find_element(By.CSS_SELECTOR, ".uhs-add-btn").click()

    clear_input_field(self.driver,By.ID,"uhs-annual-rate")
    self.driver.find_element(By.ID, "uhs-annual-rate").send_keys("0.013")
    self.driver.find_element(By.CSS_SELECTOR, ".uhs-add-btn").click()
 
    self.driver.find_element(By.ID, "uhs-update-plot").click()
    time.sleep(10)

    wait_and_click_button(self.driver, By.CSS_SELECTOR, ".uhs-viewer > .download-button")
 
    time.sleep(10) #wait for the download to complete
    zip_files= glob.glob("*.zip")
    assert len(zip_files)==3

  

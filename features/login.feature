Feature: Saucedemo Functional Test

  Background:
    Given user membuka halaman saucedemo

  # ===== POSITIVE CASES =====

  Scenario: Func-001 Login with valid data
    When user memasukkan username "standard_user" dan password "secret_sauce"
    And user klik tombol login
    Then user berhasil masuk ke halaman inventory

  Scenario: Func-002 Logout user
    When user memasukkan username "standard_user" dan password "secret_sauce"
    And user klik tombol login
    And user klik hamburger menu
    And user klik logout
    Then user diarahkan ke halaman login

  Scenario: Func-003 Check the company profile
    When user memasukkan username "standard_user" dan password "secret_sauce"
    And user klik tombol login
    And user klik hamburger menu
    And user klik about
    Then user diarahkan ke halaman saucelabs

  Scenario: Func-004 Buy 1 item
    When user memasukkan username "standard_user" dan password "secret_sauce"
    And user klik tombol login
    And user klik add to cart pada Sauce Labs Backpack
    And user klik shopping cart
    And user klik checkout
    And user mengisi first name "John" last name "Doe" postal code "12345"
    And user klik continue
    And user klik finish
    Then muncul pesan order berhasil
    And user klik back home
    Then user berhasil masuk ke halaman inventory

  Scenario: Func-005 Filtering data Price low to high
    When user memasukkan username "standard_user" dan password "secret_sauce"
    And user klik tombol login
    And user memilih filter "Price (low to high)"
    Then produk ditampilkan dari harga terendah ke tertinggi

  # ===== NEGATIVE CASES =====

  Scenario: Func-006 Login with wrong username
    When user memasukkan username "standard" dan password "secret_sauce"
    And user klik tombol login
    Then muncul pesan error "Epic sadface: Username and password do not match any user in this service"

  Scenario: Func-007 Login with wrong password
    When user memasukkan username "standard_user" dan password "secret"
    And user klik tombol login
    Then muncul pesan error "Epic sadface: Username and password do not match any user in this service"

  Scenario: Func-008 Login with blank username and password
    And user klik tombol login
    Then muncul pesan error "Epic sadface: Username is required"

  Scenario: Func-009 Login with blank password
    When user memasukkan username "standard_user" dan password ""
    And user klik tombol login
    Then muncul pesan error "Epic sadface: Password is required"

  Scenario: Func-010 Login with blank username
    When user memasukkan username "" dan password "secret_sauce"
    And user klik tombol login
    Then muncul pesan error "Epic sadface: Username is required"
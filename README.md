# Workshop Automation Project

![presentation slide](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-24%20at%201.30.52%20PM.png)

***

### Useful links

#### [PROD Demo QW Store](https://qw-test-store-prod.netlify.app) | [DEV Demo QW Store](https://qw-test-store-dev.netlify.app) | [Tax Calculator App](https://tax-by-state.vercel.app) | [The Internet Test App](https://the-internet.herokuapp.com/) |[Naming Cheatsheet](https://github.com/kettanaito/naming-cheatsheet) | [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

### Getting Started

Clone this repository:
```sh
$ git clone https://github.com/dimitriharding/next-level-automation-project
$ cd next-level-automation-project
$ npm install
```

**Note:** Ensure the **Chrome latest** is installed.

### Running Tests
Running all the tests
```sh
$ ENV=prd|dev npm run test
```
Running test suite
```sh
$ ENV=prd|dev  npm run test:suite authentication
```
Running test on specific browser
```sh
$ ENV=prd|dev BROWSERS=chrome npm test
```
Running test on multiple browsers
```sh
$ ENV=prd|dev BROWSERS=chrome,edge,safari npm test
```
> To run tests on multiple browsers locally, you need to have additional servers running [Cross Browser ReadMe](https://github.com/dimitriharding/next-level-automation-project/blob/main/tests/crossBrowserTesting/crossBrowser.test.md) 


### Git Workflow (assumes this was a standalone project)

```

                     +----------------+
              +------> featurebranch-1 +-----------+ (pull request)
              |      +----------------+            |
              |                                    |
  +--------+  |                                    +---------+
  | master + -                                     |  master |
  +----+---+  |                                    +---------+  
              |                                    |
              |      +-----------------+           |            
              +------> featurebranch-2 +-----------+  (pull request)
                    +------------------+
```

`Master` branch is protected and direct pushes are not allowed.

When working on a new feature:

1. Create a new branch that branches off the `main` branch.
2. Complete the feature/work and submit a pull request to be merged into `main`.
3. Each feature branch name should have the `page` the feature it is related to, the `id` of the task (JIRA)

Examples of descriptions: `checkout`, , `create-logout`.

**Examples of feature branch names:**

E.g `checkout`-`QW1234`-`selectors` or `checkout`-`QW1234`-`create-payment`

### Pull Request  

When submitting a pull request ensure the following:

1. Ensure there are no merge conflicts
2. Ensure all tests are passing or failing correctly.
3. Ensure a description of the work done is provided
4. Select `close branch when merged` .

After the reviewer has reviewed the pull - request, the reviewer should merge the pull request into the `master` branch. Then **all tests** should be executed to ensure all tests are either passing or failing correctly.

** Note: ** If tests are failing incorrectly. The reviewer should immediately fix all broken tests.

### Page Objects

Page objects should be aligned with pages. There might be cases where this does not apply (sections of a page)

=> pages/`name_of_page`

e.g `pages`/`login.page.js`


#### Creating Page Objects

Elements should be defined as getters in the **page object** class

```js
// Selectors
get txtUsername()       { return $("#email"); }
get txtPassword()          { return $("#password"); }
```
** Note: ** Each selector should be prefixed with the following:

1. `lbl` - label
2. `btn` - button
3. `txt` - textbox
4. `tbl` - table

> Anchors and other elements do not need to be prefixed, but should have a descriptive name

Page object template

```js
/**
 */
const page = require("./page");

// LoginPage class extends the base page object
class LoginPage extends page {

  // Locators are defined as getters
  get txtUsername()           { return $("#email"); }
  get txtPassword()           { return $("#password"); }

  navigate() {
    super.navigate("/login");
    return this;
  }

  /**
   * Enters user email
   * @param {string} username
   */
  enterUsername(username) {
    this.txtUsername.waitForDisplayed();
    this.txtUsername.clearValue();
    this.txtUsername.setValue(username);
  }
}

module.exports = new LoginPage();
```

#### Finding Selectors

* `ID`'s are best to use as selectors.
* Xpath can be used where complexity is a concern
* Luckily there is [CSS 3 selectors](http://www.w3schools.com/cssref/trysel.asp?selector=[id*=s]) which makes life easier
* Most components will have an unique identifier in class name (use contains with xpath or css) :white_check_mark:

##### Using Xpath

```js
// very bad

// good

```

##### Using CSS 3

```js
// very bad


// good

```

** Note: **

#### Custom Commands

Commands should be created similarly to the example below. Each command should have
preceding comments that contain the `@params`, `@returns` as well as a `description`
of how the command should function, if applicable.

```js


```

### Data Driven Testing


### Reporting

#### Sending report to slack

```sh
$ npm run report.slack
```

#### Viewing allure report locally
```sh
$ npm run report
```
____

#### Node dependencies
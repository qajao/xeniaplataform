const username = Cypress.env('EMAIL')
const password = Cypress.env('PASSWORD')
const apiUrl = Cypress.env('API_URL')

Cypress.Commands.add('login', () => {
    cy.session(
        username,
        () => {
            cy.intercept('POST', 'api/v1/hotel/login')
                .as('apiToken')
            cy.visit('/')
            cy.get('input[name="email"]')
                .clear()
            cy.get('input[name="email"]')
                .type(username)
            cy.get('button[type="button"]').first().click()
            cy.get('input[type="password"]')
                .clear()
            cy.get('input[type="password"]')
                .type(password)
            cy.get('.MuiButton-containedPrimary').first().click()
            cy.wait('@apiToken')
                .its('response.statusCode')
                .should('equal', 200)
            cy.url().should('contain', '/dashboard')
        },
        {
            cacheAcrossSpecs: true,
        },
    )
})

Cypress.Commands.add('apiLogin', (email, password) => {
    cy.request({
        method: 'POST',
        url: `${apiUrl}/v1/hotel/login`,
        headers: {
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'origin': 'https://app.xenia.team',
            'platform': 'webapp',
            'referer': 'https://app.xenia.team/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
        },
        body: {
            emailId: email,
            password: password,
            device: 'WEB',
            accessType: 'WEB',
            deviceToken: ''
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('fillSteps', (stepNumber, value, dropdownValue = null) => {
    cy.get('.stepCount')
    cy.contains('.stepCount', stepNumber)
        .closest('.sc-jqUVSM.dyxzRH')
        .within(() => {
            cy.get('input[id^="description-"]')
                .click({ force: true })

            cy.get('input[id^="description-"]')
                .type('{selectAll}{backspace}{selectAll}{del}', { force: true })

            cy.get('input[id^="description-"]')
                .type(value, { force: true })

            if (dropdownValue) {
                cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(0).click()
                // eslint-disable-next-line
                cy.wait(1000)
                cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(0).click()
                // eslint-disable-next-line
                cy.wait(500)
                cy.window().then((win) => {
                    const tooltip = win.document.querySelector('div[role="tooltip"]')

                    if (tooltip) {
                        cy.wrap(tooltip)
                            .should('be.visible')
                            .then(($tooltip) => {
                                cy.wrap($tooltip)
                                    .contains(dropdownValue)
                                    .should('be.visible')
                                    .then(($option) => {
                                        $option[0].click()
                                    })
                            })
                    } else {
                        throw new Error('Tooltip not found on DOM!')
                    }
                })
            }
        })
})


Cypress.Commands.add('clickEditSection', (sectionName) => {
    cy.contains('p', sectionName)
        .closest('div')
        .find('svg[data-testid="EditIconPencilBottomLineIcon"]')
        .click({ force: true })
})

Cypress.Commands.add('clickAddStep', (sectionName) => {
    cy.contains('p', sectionName)
        .parents('div')
        .find('button')
        .contains('Add Step')
        .click()
})

Cypress.Commands.add('selectDateTime', (dateValue, timeValue) => {
    // format "2025-02-12" (YYYY-MM-DD)
    const [year, month, day] = dateValue.split('-')

    cy.get('select.rdp-dropdown[name="years"]')
        .select(year)

    const monthIndex = (parseInt(month, 10) - 1).toString()

    cy.get('select.rdp-dropdown[name="months"]')
        .select(monthIndex)

    cy.get('button.rdp-day')
        .contains(day.replace(/^0/, ''))
        .click()
    if (timeValue) {
        cy.contains('li.sc-dIouRR', timeValue).click()
    }
})

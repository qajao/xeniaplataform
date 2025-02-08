describe('template spec', () => {

    before(() => {
        cy.login()
        cy.visit('/')
    })

    it('Should publish a template successfully', () => {

        cy.intercept('PUT', '/api/v1/task/checklists/*')
            .as('apiSaveChanges')

        cy.intercept('PUT', '/api/v1/task/checklists/*/toggle-publish')
            .as('apiPublish')

        cy.get('.MuiTypography-body1')
            .contains('Operations')
            .click()

        cy.get('input[placeholder="Search"]')
            .should('be.visible')


        cy.get('#folders-action-dropdown button') // Click the "Add New" button
            .should('be.visible')
            .click()

        cy.get('#actionDropdown') // Ensure the dropdown appears
            .should('be.visible')

        cy.contains('.MuiListItemButton-root', 'New Template') // Select the "New Template" option
            .should('be.visible')
            .click()

        cy.contains('.MuiTypography-body1.actionTitle', 'Build from scratch') // Find by text within the correct class
            .should('be.visible')
            .click()

        cy.get('input[placeholder="Enter template name"]') // Select input field by placeholder
            .should('be.visible')
            .type('My New Template')

        cy.contains('button', 'Next') // Select the "Next" button by text
            .should('be.visible')
            .click()

        cy.get('input[id^=\'description-\']') // Ensure the input appears
            .should('be.visible')

        // Fill the inputs
        cy.fillSteps(1, 'Main Location')
        cy.fillSteps(2, 'Inspector Name')
        cy.fillSteps(3, 'Today\'s date')

        // New Section
        cy.contains('button', 'Add Section')
            .click()

        // Edit new section and add a name
        cy.clickEditSection('Untitled Section')
        cy.get('input[placeholder="Enter Section Name"]')
            .eq(1)
            .clear({force:true})
        cy.get('input[placeholder="Enter Section Name"]')
            .eq(1)
            .type('Main Questions', { force: true, delay: 0 })

        // Add step to new section
        cy.get('.sc-jqUVSM.sFhNt')
            .eq(1) // Section
            .find('button')
            .contains('Add Step')
            .click()

        cy.contains('button', 'Save Changes')
            .should('exist')

        // Fill new step
        cy.fillSteps(4, 'Take Temperature', 'Temperature')

        cy.get('.sc-jqUVSM.sFhNt')
            .eq(1) // Section
            .find('button')
            .contains('Add Step')
            .click()

        cy.fillSteps(5, 'Shop is clean', 'Pass/Fail')

        cy.contains('button', 'Save Changes')
            .click()

        cy.wait('@apiSaveChanges')
            .its('response.statusCode')
            .should('equal', 200)

        // Publish
        cy.contains('button', 'Publish')
            .click()

        cy.wait('@apiPublish')
            .its('response.statusCode')
            .should('equal', 200)

        cy.get('h3')
            .contains('Congratulations! Template Published')
            .should('be.visible')
    })

    it('Should create a task successfully', () => {

        cy.intercept('POST', 'api/v1/task/createTask')
            .as('apiCreate')

        cy.get('.MuiTypography-body1')
            .contains('Operations')
            .click()

        cy.get('.MuiTypography-body1')
            .contains('Tasks & Work Orders')
            .click()

        // Open a new task
        cy.get('div[data-attribute="cell-click"]')
            .contains('Add New')
            .should('be.visible')
        cy.contains('button', 'Add')
            .should('be.visible')
            .click()
        cy.get('div[role="tooltip"]')
            .should('be.visible')
            .contains('New Task')
            .click()

        // Give a task name
        cy.get('input[placeholder="Give your task a name"]')
            .should('be.visible')
            .type('task 01')

        cy.contains('Attach Checklist Template')
            .should('be.visible')
            .click()

        cy.get('button.attach-button')
            .first()
            .should('be.visible')
            .click()

        // Select people
        cy.contains('Select people, teams or locations')
            .should('be.visible')
            .click()

        cy.get('.sc-liHMlC.dOsaZi')
            .within(() => {
                cy.contains('Kallin Carolus Khan')
                    .should('be.visible')
                    .closest('li')
                    .find('input[type="checkbox"]')
                    .check({ force: true });
            });

        // Select  location
        cy.contains('button', 'Select Location')
            .click({ force: true })

        cy.get('p.MuiTypography-body1')
            .contains('Test Location')
            .should('be.visible')
            .parent()
            .parent()
            .find('input[type="checkbox"]')
            .check({ force: true })

        // Add start and due date
        cy.contains('Start Date/Time')
            .should('be.visible')
            .click()
        cy.selectDateTime('2025-02-12', '03:30 PM')

        cy.contains('Due Date/Time')
            .should('be.visible')
            .click()
        cy.selectDateTime('2025-02-13')

        // Create new task
        cy.get('.MuiDialog-paper[role="dialog"]')
            .within(() => {
                cy.contains('button', 'Create')
                    .should('be.visible')
                    .click({ force: true })
            })

        // Validate api creation
        cy.wait('@apiCreate')
            .its('response.statusCode')
            .should('equal', 200)

        cy.contains('Task created')
            .should('be.visible')
    })
})
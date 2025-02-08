describe('API Login Tests', () => {

    const username = Cypress.env('EMAIL')
    const password = Cypress.env('PASSWORD')

    it('should successfully log in with valid credentials', () => {
        cy.apiLogin(username, password)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response).to.have.property('body')
                expect(response.body).to.have.property('data')
                expect(response.body.message).to.include('Login Successfully')

                const userData = response.body.data

                // Validate essential user information
                expect(userData).to.have.property('fullName').that.is.a('string')
                expect(userData).to.have.property('emailId').that.is.a('string')
                expect(userData).to.have.property('id').that.is.a('string')
                expect(userData).to.have.property('timezone').that.is.a('string')
                expect(userData).to.have.property('isVerified').that.is.a('boolean')

                // Validate hotel information
                expect(userData).to.have.property('UserHotels').that.is.an('array')
                if (userData.UserHotels.length > 0) {
                    expect(userData.UserHotels[0]).to.have.property('title')
                    expect(userData.UserHotels[0]).to.have.property('status').that.is.a('string')
                    expect(userData.UserHotels[0]).to.have.property('isAdmin').that.is.a('boolean')
                }

                // Validate permissions
                expect(userData).to.have.property('Permissions')
                expect(userData.Permissions).to.be.an('object')

                // Validate authentication tokens
                expect(userData).to.have.property('streamToken').that.is.a('string')
                expect(response.body.extra_meta).to.have.property('token').that.is.a('string')
            })
    })

    it('should return an error when logging in with an incorrect password', () => {
        cy.apiLogin(username, 'wrongPassword')
            .then((response) => {
                console.log('Response:', response)
                expect(response.status).to.eq(404)
                expect(response.body).to.have.property('error')
                expect(response.body.error.message).to.include('Invalid Email or Password!')
            })
    })

    it('should return an error when logging in with a non-existent email', () => {
        cy.apiLogin('noemail@noemail.com', password)
            .then((response) => {
                console.log('Response:', response)
                expect(response.status).to.eq(404)
                expect(response.body).to.have.property('error')
                expect(response.body.error.message).to.include('Invalid Email or Password')
            })
    })

    it('should return an error when logging in with empty fields', () => {
        cy.apiLogin('', '')
            .then((response) => {
                expect(response.status).to.eq(422)
                expect(response.body).to.have.property('error')
                expect(response.body.error.message).to.include('Valid email, username or phone number is required')
            })
    })

})
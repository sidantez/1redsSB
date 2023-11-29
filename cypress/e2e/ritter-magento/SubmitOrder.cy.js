//The user account should be registered previously

describe("Submit Order", () => {
    beforeEach(() => {
        // Visit the login page and log in
        cy.visit('https://magento.softwaretestingboard.com/customer/account/login')
        cy.login()
        cy.wait(500)
        cy.url().should("include", "/customer/account")
        //choose a product to purchase until checkout
        cy.visit('')
        cy.get('#ui-id-5 > :nth-child(2)').click()
        cy.get('dd > .items > :nth-child(1) > a').click()
        cy.wait(3000)
        cy.get(':nth-child(1) > .product-item-info > .details > .name > .product-item-link').click()
        cy.wait(3000)
        cy.get('#option-label-size-143-item-170').click() //choose product size
        cy.wait(3000)
        cy.get('#option-label-color-93-item-50').click() //choose product color
        cy.wait(3000)
        cy.get('#product-addtocart-button > span').click()
        cy.get('.message-success > div').should('contain.text', 'You added Cassius Sparring Tank to your shopping cart.')
        cy.wait(10000)
        cy.get('.counter-number').should('not.be.null')
        cy.get('.minicart-wrapper > .action').click()
        cy.get('button[title="Proceed to Checkout"]').click()
        cy.url().should("include", "/checkout/")
        cy.wait(1000)
    })

    it("Checkout - New Address - Flat Rate", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('.new-address-popup > .action > span').click() //add new address instead using the saved address
        cy.wait(500)
        //get data to input from fixture
        cy.fixture('shipping.json').then((shipping) => {
            cy.get('input[name="street[0]"]').type(shipping.address)
            cy.get('input[name="city"]').type(shipping.city)
            cy.get('select[name="region_id"]').select('Alaska')
            cy.get('input[name="postcode"]').type(shipping.zip)
            cy.get('select[name="country_id"]').select('United States')
            cy.get('input[name="telephone"]').type(shipping.phone)
            cy.get('#shipping-save-in-address-book').uncheck()
            cy.get('button.action-save-address').contains('Ship here').click()
            cy.wait(500)
        })
        cy.get('input[type="radio"][value="flatrate_flatrate"]').check() //choose the flat rate shipping options
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Alaska') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - New Address - Best Way", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('.new-address-popup > .action > span').click() //add new address instead using the saved address
        cy.wait(500)
        //get data to input from fixture
        cy.fixture('shipping.json').then((shipping) => {
            cy.get('input[name="street[0]"]').type(shipping.address)
            cy.get('input[name="city"]').type(shipping.city)
            cy.get('select[name="region_id"]').select('Alaska')
            cy.get('input[name="postcode"]').type(shipping.zip)
            cy.get('select[name="country_id"]').select('United States')
            cy.get('input[name="telephone"]').type(shipping.phone)
            cy.get('#shipping-save-in-address-book').uncheck()
            cy.get('button.action-save-address').contains('Ship here').click()
            cy.wait(500)
        })
        cy.wait(500)
        cy.get('input[type="radio"][value="tablerate_bestway"]').check() //choose the best way shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Alaska') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - Saved Address - Best Way", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('input[type="radio"][value="tablerate_bestway"]').check() //choose the best way shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Texas') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - Saved Address - Flat Rate", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('input[type="radio"][value="flatrate_flatrate"]').check() //choose the flat rate shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Texas') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - Add New Address but using Saved Address - Choose Flat Rate but switch to Best Way", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('.new-address-popup > .action > span').click() //add new address instead using the saved address
        cy.wait(500)
        //get data to input from fixture
        cy.fixture('shipping.json').then((shipping) => {
            cy.get('input[name="street[0]"]').type(shipping.address)
            cy.get('input[name="city"]').type(shipping.city)
            cy.get('select[name="region_id"]').select('Alaska')
            cy.get('input[name="postcode"]').type(shipping.zip)
            cy.get('select[name="country_id"]').select('United States')
            cy.get('input[name="telephone"]').type(shipping.phone)
            cy.get('#shipping-save-in-address-book').uncheck()
            cy.get('button.action-save-address').contains('Ship here').click()
            cy.wait(500)
        })
        cy.get('button.action.action-select-shipping-item').contains('Ship Here').click() //change to use the saved address
        cy.wait(500)
        cy.get('input[type="radio"][value="flatrate_flatrate"]').check() //choose the flat rate shipping options
        cy.wait(500)
        cy.get('input[type="radio"][value="tablerate_bestway"]').check() //choose the best way shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.wait(3000)
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Texas') //check using saved address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })
})
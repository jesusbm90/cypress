describe('test suite for the todomvc web app', () => {
  const todoItem = '[data-testid="todo-item"]';
  const footer = '[data-testid="footer"]';
  const tasks = ['first-task', 'second-task'];

  beforeEach(() => {
    // go to the baseUrl https://todomvc.com/examples/react/dist/
    cy.visit('');

    // adds the todo task 'first-task'
    cy.findByTestId('text-input').type('first-task{enter}');
  });

  it('should confirm that the todo "first-task" has been added', () => {
    // confirms that only one todo task is present in the list
    cy.assertTodoListLengthIs(1);
    cy.getElementByText(todoItem, tasks[0]).should('be.visible');
    cy.getElementByText(footer, '1 item left!').should('be.visible');
    cy.assertLinkHasSelectedClass('All');

    // selects the 'Active' filter
    cy.clickLinkByText('Active');

    // confirms that the todo 'first-task' is displayed when selecting the 'Active' tab
    cy.assertLinkHasSelectedClass('Active');
    cy.getElementByText(todoItem, tasks[0]).should('be.visible');
    cy.getElementByText(footer, '1 item left!').should('be.visible');

    // selects the 'Completed' filter
    cy.clickLinkByText('Completed');

    // confirms that the todo 'first-task' is not displayed when selecting the 'Completed' tab
    cy.assertLinkHasSelectedClass('Completed');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '1 item left!').should('be.visible');
  });

  it('should remove the todo task "first-task"', () => {
    // removes the todo task 'first-task'
    cy.contains(todoItem, tasks[0])
      .findByTestId('todo-item-button')
      .click({ force: true });

    // asserts the todo task 'first-task' has been removed
    cy.assertTodoListLengthIs(0);
    cy.getElementByText(todoItem, tasks[0]).should('not.exist');

    cy.findByTestId(footer).should('not.exist');
  });

  it('should mark the todo task "first-task" as completed', () => {
    // asserts there's no todo task when the 'Completed' filter is selected
    cy.clickLinkByText('Completed');
    cy.assertLinkHasSelectedClass('Completed');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '1 item left!').should('be.visible');

    // marks the todo task 'first-task' as completed
    cy.clickLinkByText('all');
    cy.markTodoTaskAsCompleted(todoItem, tasks[0]);

    // asserts there are no todo tasks left
    cy.getElementByText(footer, '0 items left!').should('be.visible');

    // asserts the todo task 'first-task' is not displayed when the 'Active' filter is selected
    cy.clickLinkByText('Active');
    cy.assertLinkHasSelectedClass('Active');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '0 items left!').should('be.visible');

    // asserts the todo task 'first-task' is displayed when the 'Completed' filter is selected
    cy.clickLinkByText('Completed');
    cy.assertLinkHasSelectedClass('Completed');
    cy.contains(todoItem, tasks[0]).should('have.class', 'completed');
    cy.getElementByText(todoItem, tasks[0]).should('be.visible');
    cy.getElementByText(footer, '0 items left!').should('be.visible');
  });

  it('should remove "first-task" when clicking "Clear completed" button', () => {
    // marks the todo task 'first-task' as completed
    cy.markTodoTaskAsCompleted(todoItem, tasks[0]);

    // clicks on the 'Clear completed' button
    cy.findByRole('button', { name: /clear completed/i }).click();

    // asserts the todo task 'first-task' has been removed
    cy.assertTodoListLengthIs(0);
    cy.getElementByText(todoItem, tasks[0]).should('not.exist');

    cy.findByTestId(footer).should('not.exist');
  });
});

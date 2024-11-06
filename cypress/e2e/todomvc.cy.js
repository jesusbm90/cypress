describe('test suite for the todomvc web app', () => {
  const todoItem = '[data-testid="todo-item"]';
  const footer = '[data-testid="footer"]';
  const tasks = ['first-todo', 'second-todo'];

  beforeEach(() => {
    // go to the baseUrl https://todomvc.com/examples/react/dist/
    cy.visit('');
  });

  it('should add the "first-todo" task', () => {
    // asserts there's no todo items going to the main page
    cy.assertTodoListLengthIs(0);
    cy.getElementByText(todoItem, tasks[0]).should('not.exist');
    cy.findByTestId(footer).should('not.exist');

    // adds the 'first-todo' task
    cy.addTodoTask(tasks[0]);

    // confirms that only one todo task is present in the list
    cy.assertTodoListLengthIs(1);
    cy.getElementByText(todoItem, tasks[0]).should('be.visible');
    cy.getElementByText(footer, '1 item left!').should('be.visible');
    cy.assertLinkHasSelectedClass('All');

    // selects the 'Active' filter
    cy.clickLinkByText('Active');

    // confirms that the todo 'first-todo' is displayed when selecting the 'Active' tab
    cy.assertLinkHasSelectedClass('Active');
    cy.getElementByText(todoItem, tasks[0]).should('be.visible');
    cy.getElementByText(footer, '1 item left!').should('be.visible');

    // selects the 'Completed' filter
    cy.clickLinkByText('Completed');

    // confirms that the todo 'first-todo' is not displayed when selecting the 'Completed' tab
    cy.assertLinkHasSelectedClass('Completed');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '1 item left!').should('be.visible');
  });

  it('should remove the "first-todo" task', () => {
    // adds the 'first-todo' task
    cy.addTodoTask(tasks[0]);

    // removes the todo task 'first-todo'
    cy.contains(todoItem, tasks[0])
      .findByTestId('todo-item-button')
      .click({ force: true });

    // asserts the todo task 'first-todo' has been removed
    cy.assertTodoListLengthIs(0);
    cy.getElementByText(todoItem, tasks[0]).should('not.exist');
    cy.findByTestId(footer).should('not.exist');
  });

  it('should mark the "first-todo" task as completed', () => {
    // adds the 'first-todo' task
    cy.addTodoTask(tasks[0]);

    // asserts there's no todo task when the 'Completed' filter is selected
    cy.clickLinkByText('Completed');
    cy.assertLinkHasSelectedClass('Completed');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '1 item left!').should('be.visible');

    // marks the todo task 'first-todo' as completed
    cy.clickLinkByText('all');
    cy.markTodoTaskAsCompleted(todoItem, tasks[0]);

    // asserts there are no todo tasks left
    cy.getElementByText(footer, '0 items left!').should('be.visible');

    // asserts the todo task 'first-todo' is not displayed when the 'Active' filter is selected
    cy.clickLinkByText('Active');
    cy.assertLinkHasSelectedClass('Active');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '0 items left!').should('be.visible');

    // asserts the todo task 'first-todo' is displayed when the 'Completed' filter is selected
    cy.clickLinkByText('Completed');
    cy.assertLinkHasSelectedClass('Completed');
    cy.contains(todoItem, tasks[0]).should('have.class', 'completed');
    cy.getElementByText(todoItem, tasks[0]).should('be.visible');
    cy.getElementByText(footer, '0 items left!').should('be.visible');
  });

  it('should remove "first-todo" when clicking "Clear completed" button', () => {
    // adds the 'first-todo' task
    cy.addTodoTask(tasks[0]);

    // marks the todo task 'first-todo' as completed
    cy.markTodoTaskAsCompleted(todoItem, tasks[0]);

    // clicks on the 'Clear completed' button
    cy.findByRole('button', { name: /clear completed/i }).click();

    // asserts the todo task 'first-todo' has been removed
    cy.assertTodoListLengthIs(0);
    cy.getElementByText(todoItem, tasks[0]).should('not.exist');
    cy.findByTestId(footer).should('not.exist');
  });

  it('should add the "first-todo" and "second-todo" tasks', () => {
    // adds the "first-todo" and "second-todo" tasks
    tasks.forEach((element) => {
      cy.addTodoTask(element);
    });

    // confirms both "first-todo" and "second-todo" tasks are displayed
    cy.assertTodoListLengthIs(2);
    tasks.forEach((element) => {
      cy.getElementByText(todoItem, element).should('be.visible');
    });
    cy.getElementByText(footer, '2 items left!').should('be.visible');
    cy.assertLinkHasSelectedClass('All');

    // selects the 'Active' filter
    cy.clickLinkByText('Active');

    // confirms both "first-todo" and "second-todo" tasks are displayed when selecting the 'Active' tab
    cy.assertLinkHasSelectedClass('Active');
    tasks.forEach((element) => {
      cy.getElementByText(todoItem, element).should('be.visible');
    });
    cy.getElementByText(footer, '2 items left!').should('be.visible');

    // selects the 'Completed' filter
    cy.clickLinkByText('Completed');

    // confirms that the todo 'first-todo' is not displayed when selecting the 'Completed' tab
    cy.assertLinkHasSelectedClass('Completed');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '2 items left!').should('be.visible');
  });

  it('should mark as completed both "first-todo" and "second-todo" tasks when clicking on the general toggle', () => {
    // adds the "first-todo" and "second-todo" tasks
    tasks.forEach((element) => {
      cy.addTodoTask(element);
    });

    // clicks on the general toggle
    cy.findByTestId('toggle-all').click();

    // asserts there are no todo tasks left
    cy.getElementByText(footer, '0 items left!').should('be.visible');

    // asserts both "first-todo" and "second-todo" tasks are not displayed when the 'Active' filter is selected
    cy.clickLinkByText('Active');
    cy.assertLinkHasSelectedClass('Active');
    cy.findByTestId('todo-item').should('not.exist');
    cy.getElementByText(footer, '0 items left!').should('be.visible');

    // asserts both "first-todo" and "second-todo" tasks are displayed when the 'Completed' filter is selected
    cy.clickLinkByText('Completed');
    cy.assertLinkHasSelectedClass('Completed');
    tasks.forEach((element) => {
      cy.contains(todoItem, element).should('have.class', 'completed');
      cy.getElementByText(todoItem, element).should('be.visible');
    });
    cy.getElementByText(footer, '0 items left!').should('be.visible');
  });
});

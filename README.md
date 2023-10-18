# back-end

## Rules
### 1. Branching
- main Branch: Direct commits to this branch is prohibited. Create pull requests (PRs) from feature branches into main.
- Feature Branches: Create feature branches for new development or bug fixes. These branches are short-lived and should be created based on the main branch.
### 2. Pull Request Workflow
- When working on a new feature or bug fix, create a feature branch from main.
- Regularly push your local changes to your feature branch on GitHub.
- When your feature is ready, create a pull request (PR) to merge your branch into main.
- Another team member will review your PR.
- If there are any conflicts or required changes, address them and update the PR.
- Once the PR is approved, it can be merged into main.
### 3. Commit Messages
- Use meaningful and descriptive commit messages that explain what each commit does.
### 4. Project Structure
- Maintain a clean and organized project structure.
- Follow consistent naming conventions for files, folders, and variables.
### 5. Documentation
- Maintain up-to-date project documentation.
- Please add the API endpoint to the readme file.
  
## Installation
1. Clone the repository
```bash
git clone https://github.com/Radiate-Mental-Health-App/back-end.git
```
2. Install dependencies
```bash
npm install
```
3. Optional : change database url in the /config/db.config.js
```javascript
module.exports = {
  HOST: "0.0.0.0",
  PORT: 27017,
  DB: "radiate_DB",
};
```
4. Start the server
```
node server.js
```
5. The server should be running on http://localhost:5000

## API
1. Auth
![image](https://github.com/Radiate-Mental-Health-App/back-end/assets/39270680/7a190791-d99e-4332-a928-cdef1f8fa6ac)
2. Mood Tracking
![image](https://github.com/Radiate-Mental-Health-App/back-end/assets/39270680/8dc610a9-9614-4f63-a2d2-a238ee6904c4)
3. Journal Prompt
![image](https://github.com/Radiate-Mental-Health-App/back-end/assets/39270680/bef8d726-564a-4b1b-ba33-1d66bd55f759)
4. Journal Entry
![image](https://github.com/Radiate-Mental-Health-App/back-end/assets/39270680/90f4ab63-6328-4b84-96e2-f4754791a535)



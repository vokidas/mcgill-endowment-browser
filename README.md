# The McGill Endowment Browser

The McGill Endowment Browser is a tool designed to explore McGill University's investment data, obtained through Access to Information requests.

Some setup is required if you wish to run your own version:

1. Copy `example.env.json` to `.env.json`.

2. Create a [Google service account](https://cloud.google.com/storage/docs/authentication#service_accounts) and generate a private key.

3. In `.env.json`:
    - set `google_client_email` to the service account username (`"<user>@<app>.iam.gserviceaccount.com"`);
    - set `google_private_key` to the private key (`"-----BEGIN PRIVATE KEY-----\n<...>"`).

4. Create a raw data spreadsheet in Google Sheets by importing the CSV data at https://mcgillinvests.in/api/holdings/csv.

5. In `.env.json`:
    - set `raw_spreadsheet_id` to the Google Sheets document ID (e.g. `"1F4Ffug8qbGYgcQzZA8jUycvRdr5DlSd6LhLJX4ti8bE"`);
    - set `raw_sheet_name` to the sheet name (e.g. `"Sheet1"`).

6. Create a metadata spreadsheet in Google Sheets by importing the CSV data at https://mcgillinvests.in/api/metadata/csv.

7. In `.env.json`:
    - set `metadata_spreadsheet_id` to the Google Sheets document ID;
    - set `metadata_sheet_name` to the sheet name.

8. Share the raw data and metadata Google Sheets spreadsheets with the service account.

9. Install the dependencies with Node.js:

    `yarn && cd client && yarn`

10. Run the application:

    `yarn start`

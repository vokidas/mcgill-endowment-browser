# Updating the raw data spreadsheet

Follow the below procedure to update the application after obtaining a new raw data spreadsheet:

1. Import the new spreadsheet into Google Sheets.

2. Create a filter view sorted by Asset Type Name and filtered by Asset Type Category that includes the following:
    - `EQUITY`
    - `FIXED INCOME SECURITIES`
    - `PREFERRED SECURITIES`

3. Use the filter view to compare the new and old data and identify any new asset type names. Add them to `client/src/views.config.json` where applicable.

4. For holdings with the Asset Type Name `MATERIALS (CANADIAN)`, identify the companies that operate in mining or oil and gas. For those companies, manually edit the Asset Type Name to `MATERIALS (CANADIAN) - MINING` or `MATERIALS (CANADIAN) - OIL` respectively.

5. Share the Google Sheets spreadsheet with the `google_client_email` in `.env.json`.

6. In `.env.json`, update the `raw_spreadsheet_id`, as well as the `raw_sheet_name` if necessary.

7. Change the last updated date in `client/src/Splash.js`.

8. Rebuild and deploy.

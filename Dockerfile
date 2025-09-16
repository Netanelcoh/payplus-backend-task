# Use the official Microsoft SQL Server 2022 image for Linux
# This image is based on Ubuntu and is optimized for Docker
FROM mcr.microsoft.com/mssql/server:2022-latest

# Set environment variables for the SQL Server instance
# These are required to accept the EULA and set a strong SA password
# The SA_PASSWORD must meet complexity requirements: 8-128 chars, 
# and include chars from at least 3 of these sets: uppercase, lowercase, digits, special chars
ENV ACCEPT_EULA=Y 
ENV MSSQL_SA_PASSWORD="MyMssqlP@ssw0rd"

# Expose the default SQL Server port
# This allows external applications to connect to the database
EXPOSE 1433
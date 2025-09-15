# Netlify Deployment Guide

## Overview

This document provides instructions for deploying the expense tracker application to Netlify. The application uses a serverless function to handle API requests.

## Deployment Configuration

The following files are used for Netlify deployment:

- `netlify.toml`: Configuration for Netlify build and functions
- `.env.netlify`: Environment variables for Netlify functions
- `netlify/functions/api.ts`: Serverless function handler
- `netlify-build.js`: Build script for Netlify deployment

## Deployment Steps

1. **Connect to Netlify**:
   - Sign in to Netlify and connect your repository
   - Select the repository and branch to deploy

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist/spa`

3. **Environment Variables**:
   - Add any necessary environment variables in the Netlify dashboard
   - For MongoDB connection, add `MONGODB_URI` with your MongoDB connection string

## Troubleshooting

If you encounter a 502 Bad Gateway error:

1. Check the Netlify function logs in the Netlify dashboard
2. Ensure all dependencies are properly included in the `external_node_modules` section of `netlify.toml`
3. Verify that the build process is completing successfully

## Local Testing

To test the Netlify functions locally:

1. Install the Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify dev` to start the local development server

## Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Serverless HTTP Documentation](https://github.com/dougmoscrop/serverless-http)
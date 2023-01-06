# Order Management System.

Order Managament System provide a service that allows other systems and teams to obtain information about orders.

## Installation

Use the npm [mongoose, express, cors, body-parser] and node.js to install some libraries for the backend development.

## Assumptions

In Order Management System there is a serviceRecords Schema which is connected with the order Schema through the Object Id, So that the information which is to be needed can be populated easily.

In Order Management System all the CRUD operations which is to be needed are implemented according to the required endpoints.

## Usage

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



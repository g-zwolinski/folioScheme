'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  info: String,
  type: String,
  active: Boolean
});

export default mongoose.model('Thing', ThingSchema);

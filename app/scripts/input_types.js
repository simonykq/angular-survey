/**
 * Created by simonykq on 30/11/2014.
 */

var TYPES = [
  'text',
  'number',
  'email',
  'url',
  'tel',
  'color',
  //'file',
  'range',
  'textarea',
  'select',
  'multi-select',
  'radio',
  'checkbox',
  'datetime',
  'date',
  'time',
  'month',
  'week',
  'day'
];

angular.module('surveyApp')
  .value('inputTypes', TYPES);

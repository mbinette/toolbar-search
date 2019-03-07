/**
  `toolbar-search` is a simple search field for Polymer

### Example
  
        <toolbar-search></toolbar-search>
        <toolbar-search active></toolbar-search>
        <toolbar-search active term="cats"></toolbar-search>

### Styling

Custom property | Description | Default
----------------|-------------|---------
`--toolbar-search-width` | Width of the search input | `262px`
`--toolbar-search-input` | Mixin for the search input  | `{}`
`--toolbar-search-button` | Mixin for paper-icon-button | `{}`
`--toolbar-search-container` | Mixin for the search container | `{}`


@demo demo/index.html
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

class ToolbarSearch extends PolymerElement {
  static get template() {
    return html`
    <style>
      #search-container {
        @apply --layout-horizontal;
        @apply --layout-center;
        transition: .2s cubic-bezier(.4, 0, .2, 1);
        width: 40px;
      }

      :host([active]) #search-container {
        width: var(--toolbar-search-width, 262px);
      }

      :host([active]) #input {
        display: block;
        @apply --layout-flex;
        @apply --toolbar-search-input;
      }

      #input {
        display: none;
      }

      paper-icon-button{
        @apply --toolbar-search-button;
      }
    </style>

    <div id="search-container">
      <iron-a11y-keys keys="enter" on-keys-pressed="search"></iron-a11y-keys>
      <paper-icon-button on-click="showSearch" icon="icons:search"></paper-icon-button>
      <paper-input value="{{term}}" id="input" no-label-float="" label="[[inputLabel]]">
        <paper-icon-button on-click="hideSearch" slot="suffix" icon="icons:close"></paper-icon-button>
      </paper-input>
    </div>
`;
  }

  static get is() { return 'toolbar-search'; }
  static get properties() {
    return {

      /**
       * Indicates if the search bar is visible
       */
      active: {
        type: Boolean,
        notify: true,
        reflectToAttribute:true
      },

      /**
       * Text of the search input
       */
      term: {
        type: String,
        notify: true
      },

      /**
       * Label of the search input
       */
      inputLabel: {
        type: String,
        value: "Search"
      }
    };
  }

  /**
   * Shows the search input
   */
  showSearch() {
    this.active = true;
    this.$.input.focus();
  }

  /**
   * Send the custom Search event with the current term and then clear/close the search input
   */
  search() {
    this.dispatchEvent(new CustomEvent('search', {detail: {value: this.term}}));
    this.hideSearch();
  }

  /**
   * Hides the search input
   */
  hideSearch() {
    this.active = false;
    this.term = "";
  }
}

window.customElements.define(ToolbarSearch.is, ToolbarSearch);

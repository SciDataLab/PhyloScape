# Creating and Integrating New Plugins in PhyloScape

## In the **phyloscape-geo** project:
1. **src/views/** directory (for adding new plugins)

## In the **phyloscape-web** project:
- **src/utils/utils.js** (for adding plugin types)
- **src/views/Application/two.vue** or **index.vue** (for importing plugins)
- **src/views/Application/components/** (for adding plugin configurations)

## Steps:
1. **Create a New Plugin in phyloscape-geo**
   - Develop the new plugin and place its content in the `src/views/` directory of the `phyloscape-geo` project.

2. **Configure and Import the Plugin in phyloscape-web**
   - Add the plugin type to `src/utils/utils.js`.
   - Import the new plugin in either `two.vue` or `index.vue`.
   - Add the configuration for the new plugin in the `src/views/Application/components/` directory.

3. **Implement Interaction Between the Tree and the New Plugin**
   - Configure the code to enable interaction between the tree visualization and the new plugin (e.g., click events).
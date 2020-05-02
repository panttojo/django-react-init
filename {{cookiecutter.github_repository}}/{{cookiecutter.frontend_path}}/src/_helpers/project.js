import packageJson from '../../package.json'

const DEFAULT_NAME = packageJson.name
export const PROJECT_NAME = DEFAULT_NAME.replace('-', ' ').replace('_', ' ').charAt(0).toUpperCase() + DEFAULT_NAME.slice(1)
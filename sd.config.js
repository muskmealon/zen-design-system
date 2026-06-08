import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['src/tokens/figma-tokens/*.json'],

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/generated/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },

    js: {
      transformGroup: 'js',
      buildPath: 'src/tokens/generated/',
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/esm',
        },
      ],
    },
  },
})

await sd.buildAllPlatforms()

{
  "targets": [
    {
      "target_name": "screenlock",
      "sources": [
        "./src/screenlock.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
      },
      'conditions': [
        ['OS=="win"', {
          'sources': [
            './src/screenlock.cpp',
          ],
          'defines': [
            'UNICODE',
            'WIN32_LEAN_AND_MEAN',
            'NOMINMAX'
          ],
          'msvs_settings': {
            'VCCLCompilerTool': {
              'ExceptionHandling': '1'
            }
          }
        }]
      ]
    }
  ]
}
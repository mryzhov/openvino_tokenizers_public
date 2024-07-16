# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src/extern_icu"
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src/extern_icu-build"
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu"
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/tmp"
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src/extern_icu-stamp"
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src"
  "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src/extern_icu-stamp"
)

set(configSubDirs Release)
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src/extern_icu-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/rmikhail/src/openvino_tokenizers/build/third_party/icu/src/extern_icu-stamp${cfgdir}") # cfgdir has leading slash
endif()

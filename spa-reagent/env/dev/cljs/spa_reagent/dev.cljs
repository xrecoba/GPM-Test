(ns ^:figwheel-no-load spa-reagent.dev
  (:require
    [spa-reagent.core :as core]
    [devtools.core :as devtools]))

(devtools/install!)

(enable-console-print!)

(core/init!)

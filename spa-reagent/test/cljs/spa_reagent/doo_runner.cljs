(ns spa-reagent.doo-runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [spa-reagent.core-test]))

(doo-tests 'spa-reagent.core-test)

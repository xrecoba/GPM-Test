(ns spa-reagent.prod
  (:require [spa-reagent.core :as core]))

;;ignore println statements in prod
(set! *print-fn* (fn [& _]))

(core/init!)

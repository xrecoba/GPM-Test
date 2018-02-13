(ns api.core
  (:require [reagent.core :as r]))

(defn content [state]
  [:div (:text @state)])

(defn init []
  (let [state (r/atom {:text "Hello, world!"})]
    (r/render-component [content state]
                        (.querySelector js/document "#content"))))

(init)


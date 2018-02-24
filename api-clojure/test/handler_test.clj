(ns handler-test
  (:require [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [handler :refer :all]))

(deftest test-file-is-previewable
  (testing "txt-file-is-previewable"
    (let [response (fileIsPreviewable {:name "whatever.txt"})]
      (is (= response true))))

  (testing "non-txt-file-is-not-previewable"
    (let [response (fileIsPreviewable {:name "Whatever.noTxt"})]
      (is (= response false))))

  (testing "file-without-extension-is-not-previewable"
    (let [response (fileIsPreviewable {:name "Whatever"})]
      (is (= response false))))
  )

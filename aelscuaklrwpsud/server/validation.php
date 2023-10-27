<?php
    function checkPresent($input)
    {
        if (!($input)) {
            return "Input cannot be null";
        }
    }

    function checkLength($input, $minLen, $maxLen) {
        if ($input) {
            if (strlen($input) < $minLen || strlen($input) > $maxLen ) {
                return "Input is not in the right length range";
            }
        } else {
            return "Input cannot be null";
        }
    }

    function checkRange($input, $minLen, $maxLen) {
        if ($input) {
            if ($input < $minLen || $input > $maxLen ) {
                return "Input is not in the right length range";
            }
        } else {
            return "Input cannot be null";
        }
    }

    function checkPrice($input) {
        if ($input) {
            if ($input < 1.00) {
                return "Input must be greater than 1.00";
            }
        } else {
            return "Input cannot be null";
        }
    }

    function checkEmail($input) {
        if ($input) {
            if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
                return "Input is not in a valid e-mail format";
            }
        } else {
            return "Input cannot be null";
        }
    }

    function checkPhone($input) {
        $ukPhonePattern = "/^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/";
        if ($input) {
            if (!preg_match($ukPhonePattern, $input)) {
                return "Input is not in a valid UK phone number format";
            }
        } else {
            return "Input cannot be null";
        }
    }

    function checkPostCode($input) {
        $ukPostcodePattern = "/^[a-z]{1,2}\\d[a-z\\d]?\\s*\\d[a-z]{2}$/i";
        if ($input) {
            if (!preg_match($ukPostcodePattern, $input)) {
                return "Input is not in a valid UK postcode format";
            }
        } else {
            return "Input cannot be null";
        }
    }
?>

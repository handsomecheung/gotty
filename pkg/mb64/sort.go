package mb64

import (
	"math"
)

var baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

func genCharMap(chars string) map[rune]int {
	m := make(map[rune]int)
	for i, c := range chars {
		m[c] = i
	}
	return m
}

func sum(numbers []int) int {
	total := 0
	for _, n := range numbers {
		total += n
	}
	return total
}

func reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

var baseCharsMap = genCharMap(baseChars)

func charsToNumbers(chars string) []int {
	numbers := []int{}
	for _, c := range chars {
		if c == '=' {
			numbers = append(numbers, sum(numbers)%64)
		} else {
			numbers = append(numbers, baseCharsMap[c])
		}
	}
	return numbers
}

func sortStr(str string, numbers []int) string {
	res := str
	for _, number := range numbers {
		_res := ""
		_str := res
		for len(_str) > 0 {
			powResult := (number + len(_str)) * int(math.Abs(float64(number-len(_str))))
			index := powResult % len(_str)
			_res += string(_str[index])
			_str = _str[:index] + _str[index+1:]
		}
		_res = reverse(_res)
		res = _res
	}
	return res
}

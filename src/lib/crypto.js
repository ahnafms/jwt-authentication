class RSA {
    constructor() {}
  
    generatePrime(min, max) {
      let num = Math.floor(Math.random() * (max - min + 1) + min);
      while (!this.isPrime(num)) {
        num++;
      }
      return num;
    }
  
    isPrime(num) {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }
  
    gcd(a, b) {
      while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    }
  
    modInverse(a, m) {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
          return x;
        }
      }
      return null;
    }
  
    generateRSAKeys(numBits) {
      let primes = [];
      let p = this.generatePrime(Math.pow(2, numBits - 1), Math.pow(2, numBits));
      let q = this.generatePrime(Math.pow(2, numBits - 1), Math.pow(2, numBits));
      primes.push(p, q);
  
      let n = p * q;
      let phi = (p - 1) * (q - 1);
  
      let e = 65537;
      while (this.gcd(e, phi) !== 1) {
        e++;
      }
  
      let d = this.modInverse(e, phi);
  
      return { publicKey: [e, n], privateKey: [d, n], primes: primes };
    }
  
    encryptRSA(message, publicKey) {
        let e = publicKey[0];
        let n = publicKey[1];
        let result = [];
        for (let i = 0; i < message.length; i++) {
            let charCode = message.charCodeAt(i);
            let encryptedCharCode = this.modPow(charCode, e, n);
            result.push(encryptedCharCode);
        }
        return result;
    }
    
    decryptRSA(encryptedMessage, privateKey) {
        let d = privateKey[0];
        let n = privateKey[1];
        let result = '';
        for (let i = 0; i < encryptedMessage.length; i++) {
            let encryptedCharCode = encryptedMessage[i];
            let decryptedCharCode = this.modPow(encryptedCharCode, d, n);
            result += String.fromCharCode(decryptedCharCode);
        }
        return result;
    }

    modPow(base, exponent, modulus) {
        if (modulus === 1) {
            return 0;
        }
    
        let result = 1;
        base = base % modulus;
    
        while (exponent > 0) {
            if (exponent % 2 === 1) {
                result = (result * base) % modulus;
            }
    
            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
        }
    
        return result;
    }
  }
  
  export default RSA;
  
